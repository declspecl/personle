package com.declspecl.controller;

import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionProvider;
import com.declspecl.controller.responses.GetUserDailyGuessResponse;
import com.declspecl.controller.responses.ImmutableGetUserDailyGuessResponse;
import com.declspecl.dependencies.dynamodb.UserGameDataTable;
import com.declspecl.model.UserDailyGuess;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Controller
public class UserDailyGuessesController {
	private final ControllerUtils controllerUtils;
	private final UserGameDataTable userGameDataTable;
	private final UserSessionProvider userSessionProvider;

	@Autowired
	public UserDailyGuessesController(
			ControllerUtils controllerUtils,
			UserGameDataTable userGameDataTable,
			UserSessionProvider userSessionProvider
	) {
		this.controllerUtils = controllerUtils;
		this.userGameDataTable = userGameDataTable;
		this.userSessionProvider = userSessionProvider;
	}

	@GetMapping("/api/guess")
	public ResponseEntity<GetUserDailyGuessResponse> getUserGuessToday(HttpServletRequest request) {
		Map<String, String> cookies = controllerUtils.readAllCookiesFromRequest(request);
		Optional<String> personleCookieValue = controllerUtils.getPersonleCookie(cookies);

		if (personleCookieValue.isEmpty()) {
			return controllerUtils.buildResponseWithUserSessionCookie().body(GetUserDailyGuessResponse.EMPTY);
		}

		UUID userSessionId = userSessionProvider.decodeSession(personleCookieValue.get());
		Optional<UserDailyGuess> userGuessToday = userGameDataTable.getUserDailyGuessToday(userSessionId);

		return ResponseEntity.ok(
				userGuessToday.map(guess -> ImmutableGetUserDailyGuessResponse.of(guess.guesses().stream().toList()))
						.orElse(GetUserDailyGuessResponse.EMPTY)
		);
	}

	@PostMapping("/api/guess")
	public ResponseEntity<Void> postUserGuess(HttpServletRequest request) {
		Map<String, String> cookies = controllerUtils.readAllCookiesFromRequest(request);
		Optional<String> personleCookieValue = controllerUtils.getPersonleCookie(cookies);

		return null;
	}
}
