package com.declspecl.controller;

import com.declspecl.PersonleApiConstants;
import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionGenerator;
import com.declspecl.components.UserSessionTransformer;
import com.declspecl.controller.requests.PostUserGuessRequest;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import com.declspecl.repository.DailyGuessesRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static com.declspecl.PersonleApiConstants.DAILY_GUESSES_ENDPOINT;

@Log4j2
@RestController
@RequestMapping(DAILY_GUESSES_ENDPOINT)
public class PostDailyGuessController {
	private final ControllerUtils controllerUtils;
	private final Set<PersonaName> personaNamePool;
	private final Supplier<LocalDate> todaySupplier;
	private final UserSessionGenerator userSessionGenerator;
	private final DailyGuessesRepository dailyGuessesRepository;
	private final UserSessionTransformer userSessionTransformer;

	@Autowired
	public PostDailyGuessController(
			ControllerUtils controllerUtils,
			Supplier<LocalDate> todaySupplier,
			UserSessionGenerator userSessionGenerator,
			DailyGuessesRepository dailyGuessesRepository,
			UserSessionTransformer userSessionTransformer,
			@Qualifier("PersonaNamePool") List<PersonaName> personaNamePool
	) {
		this.todaySupplier = todaySupplier;
		this.controllerUtils = controllerUtils;
		this.userSessionGenerator = userSessionGenerator;
		this.dailyGuessesRepository = dailyGuessesRepository;
		this.userSessionTransformer = userSessionTransformer;
		this.personaNamePool = new HashSet<>(personaNamePool);
	}

	@PostMapping
	public ResponseEntity<Void> postUserGuess(HttpServletRequest request, @RequestBody PostUserGuessRequest payload) {
		PersonaName userGuess = new PersonaName(payload.guess());
		if (!personaNamePool.contains(userGuess)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		Optional<EncodedHashedUserSessionId> userSessionCookie = controllerUtils.getUserSessionCookie(request);
		if (userSessionCookie.isEmpty()) {
			return buildDefaultResponse(userGuess);
		}

		HashedUserSessionId hashedUserSessionId = userSessionTransformer.decodeEncodedHashedUserSessionId(userSessionCookie.get());
		Optional<DailyGuesses> existingDailyGuesses = dailyGuessesRepository.getUserGuessesForToday(hashedUserSessionId);
		if (existingDailyGuesses.isEmpty()) {
			return buildDefaultResponse(userGuess, hashedUserSessionId);
		}

		DailyGuesses dailyGuesses = existingDailyGuesses.get();
		DailyGuesses updatedDailyGuesses = ImmutableDailyGuesses.copyOf(dailyGuesses).withGuesses(
				Stream.concat(dailyGuesses.guesses().stream(), Stream.of(userGuess))
						.distinct()
						.toList()
		);

		if (updatedDailyGuesses.guesses().size() > PersonleApiConstants.MAX_DAILY_GUESSES) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
		}

		dailyGuessesRepository.writeDailyGuesses(updatedDailyGuesses);

		return ResponseEntity.ok().build();
	}

	private ResponseEntity<Void> buildDefaultResponse(PersonaName userGuess) {
		HashedUserSessionId hashedUserSessionId = userSessionGenerator.generateNewHashedUserSessionId();
		log.info("Request with no session, giving {}", hashedUserSessionId.value());

		return buildDefaultResponse(userGuess, hashedUserSessionId);
	}

	private ResponseEntity<Void> buildDefaultResponse(PersonaName userGuess, HashedUserSessionId hashedUserSessionId) {
		DailyGuesses dailyGuesses = ImmutableDailyGuesses.builder()
				.withHashedUserSessionId(hashedUserSessionId)
				.withDate(todaySupplier.get())
				.withGuesses(List.of(userGuess))
				.build();

		dailyGuessesRepository.writeDailyGuesses(dailyGuesses);

		EncodedHashedUserSessionId encodedHashedUserSessionId = userSessionTransformer.encodeHashedUserSessionId(hashedUserSessionId);
		return controllerUtils.buildResponseWithUserSessionCookie(encodedHashedUserSessionId).build();
	}
}
