package com.declspecl.controller;

import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionGenerator;
import com.declspecl.components.UserSessionTransformer;
import com.declspecl.controller.responses.GetUserGuessesResponse;
import com.declspecl.controller.responses.ImmutableGetUserGuessesResponse;
import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.PersonaName;
import com.declspecl.repository.DailyGuessesRepository;
import com.declspecl.model.DailyGuesses;
import com.declspecl.repository.DailyPersonaRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static com.declspecl.PersonleApiConstants.DAILY_GUESSES_ENDPOINT;

@Log4j2
@RestController
@RequestMapping(DAILY_GUESSES_ENDPOINT)
public class GetDailyGuessController {
	private final ControllerUtils controllerUtils;
	private final UserSessionGenerator userSessionGenerator;
	private final DailyPersonaRepository dailyPersonaRepository;
	private final DailyGuessesRepository dailyGuessesRepository;
	private final UserSessionTransformer userSessionTransformer;

	@Autowired
	public GetDailyGuessController(
			ControllerUtils controllerUtils,
			UserSessionGenerator userSessionGenerator,
			DailyPersonaRepository dailyPersonaRepository,
			DailyGuessesRepository dailyGuessesRepository,
			UserSessionTransformer userSessionTransformer
	) {
		this.controllerUtils = controllerUtils;
		this.userSessionGenerator = userSessionGenerator;
		this.dailyPersonaRepository = dailyPersonaRepository;
		this.dailyGuessesRepository = dailyGuessesRepository;
		this.userSessionTransformer = userSessionTransformer;
	}

	@GetMapping
	public ResponseEntity<GetUserGuessesResponse> getUserGuessesToday(HttpServletRequest request) throws ExecutionException {
		Optional<EncodedHashedUserSessionId> userSessionCookie = controllerUtils.getUserSessionCookie(request);
		PersonaName todayPersona = dailyPersonaRepository.getPersonaForToday();

		if (userSessionCookie.isEmpty()) {
			return buildDefaultResponse(todayPersona);
		}

		HashedUserSessionId hashedUserSessionId = userSessionTransformer.decodeEncodedHashedUserSessionId(userSessionCookie.get());
		log.info("Request with session {}", hashedUserSessionId.value());

		Optional<DailyGuesses> todayGuesses = dailyGuessesRepository.getUserGuessesToday(hashedUserSessionId);
		List<PersonaName> personaGuesses = todayGuesses.map(DailyGuesses::guesses).orElse(Collections.emptyList());

		return ResponseEntity.ok(
				ImmutableGetUserGuessesResponse.builder()
						.withGuesses(personaGuesses.stream().map(PersonaName::value).toList())
						.withTodayPersona(todayPersona.value())
						.build()
		);
	}

	private ResponseEntity<GetUserGuessesResponse> buildDefaultResponse(PersonaName todayPersona) {
		HashedUserSessionId hashedUserSessionId = userSessionGenerator.generateNewHashedUserSessionId();
		EncodedHashedUserSessionId encodedHashedUserSessionId = userSessionTransformer.encodeHashedUserSessionId(hashedUserSessionId);

		log.info("Request with no session, giving {}", hashedUserSessionId.value());

		return controllerUtils.buildResponseWithUserSessionCookie(encodedHashedUserSessionId).body(
				ImmutableGetUserGuessesResponse.builder()
						.withGuesses(Collections.emptyList())
						.withTodayPersona(todayPersona.value())
						.build()
		);
	}
}
