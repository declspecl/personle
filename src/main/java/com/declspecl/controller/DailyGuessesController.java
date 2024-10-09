package com.declspecl.controller;

import com.declspecl.PersonleApiConstants;
import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionTransformer;
import com.declspecl.controller.requests.PostUserGuessRequest;
import com.declspecl.controller.responses.GetUserGuessesResponse;
import com.declspecl.controller.responses.ImmutableGetUserGuessesResponse;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.repository.DailyGuessesRepository;
import com.declspecl.model.DailyGuesses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Stream;

@Log4j2
@Controller
public class DailyGuessesController {
	private final Supplier<UUID> uuidSupplier;
	private final ControllerUtils controllerUtils;
	private final Supplier<LocalDate> todaySupplier;
	private final DailyGuessesRepository dailyGuessesRepository;
	private final UserSessionTransformer userSessionTransformer;

	@Autowired
	public DailyGuessesController(
			Supplier<UUID> uuidSupplier,
			ControllerUtils controllerUtils,
			Supplier<LocalDate> todaySupplier,
			DailyGuessesRepository dailyGuessesRepository,
			UserSessionTransformer userSessionTransformer
	) {
		this.uuidSupplier = uuidSupplier;
		this.controllerUtils = controllerUtils;
		this.todaySupplier = todaySupplier;
		this.dailyGuessesRepository = dailyGuessesRepository;
		this.userSessionTransformer = userSessionTransformer;
	}

	@GetMapping("/api/guess")
	public ResponseEntity<GetUserGuessesResponse> getUserGuessesToday(HttpServletRequest request) {
		Map<String, String> cookies = controllerUtils.buildCookieMap(request);
		Optional<String> userSessionCookie = controllerUtils.getUserSessionCookie(cookies);

		if (userSessionCookie.isEmpty()) {
			log.info("Got request for user without session");
			return controllerUtils.buildResponseWithUserSessionCookie(uuidSupplier.get())
					.body(ImmutableGetUserGuessesResponse.of(Collections.emptyList()));
		}

		UUID userSessionId = userSessionTransformer.decodeSession(userSessionCookie.get());
		log.info("Got request for user session {}", userSessionId);

		Optional<DailyGuesses> todayGuesses = dailyGuessesRepository.getGuessesForToday(userSessionId);
		List<String> personaGuesses = todayGuesses.map(DailyGuesses::guesses).orElse(Collections.emptyList());

		return ResponseEntity.ok(ImmutableGetUserGuessesResponse.of(personaGuesses));
	}

	@PostMapping("/api/guess")
	public ResponseEntity<Void> postUserGuess(
			HttpServletRequest rawRequest,
			@RequestBody PostUserGuessRequest body
	) {
		Map<String, String> cookies = controllerUtils.buildCookieMap(rawRequest);
		Optional<String> userSessionCookie = controllerUtils.getUserSessionCookie(cookies);

		UUID userSessionId = userSessionCookie.map(userSessionTransformer::decodeSession).orElse(uuidSupplier.get());
		Optional<DailyGuesses> maybeDailyGuesses = dailyGuessesRepository.getGuessesForToday(userSessionId);
		DailyGuesses updatedDailyGuesses = maybeDailyGuesses.map(
				existingGuesses -> ImmutableDailyGuesses.copyOf(existingGuesses).withGuesses(
						Stream.concat(existingGuesses.guesses().stream(), Stream.of(body.guess()))
								.distinct()
								.toList()
				)
		).orElse(
				ImmutableDailyGuesses.builder()
						.withUserSessionId(userSessionId)
						.withDate(todaySupplier.get())
						.withGuesses(List.of(body.guess()))
						.build()
		);

		if (updatedDailyGuesses.guesses().size() > PersonleApiConstants.MAX_DAILY_GUESSES) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
		}

		dailyGuessesRepository.writeDailyGuesses(updatedDailyGuesses);

		if (userSessionCookie.isEmpty()) {
			log.info("Got request lacking session cookie");
			return controllerUtils.buildResponseWithUserSessionCookie(userSessionId).build();
		}
		else {
			return ResponseEntity.ok(null);
		}
	}
}
