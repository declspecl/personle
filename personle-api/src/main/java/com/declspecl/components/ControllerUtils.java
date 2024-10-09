package com.declspecl.components;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ControllerUtils {
	private final UserSessionTransformer userSessionTransformer;

	public static final String PERSONLE_USER_SESSION_COOKIE_NAME = "personle.v1";

	@Autowired
	public ControllerUtils(UserSessionTransformer userSessionTransformer) {
		this.userSessionTransformer = userSessionTransformer;
	}

	public Map<String, String> buildCookieMap(HttpServletRequest request) {
		Optional<Cookie[]> maybeCookies = Optional.ofNullable(request.getCookies());

		return maybeCookies.map(cookies -> Arrays.stream(cookies).collect(
				Collectors.toMap(
						Cookie::getName,
						Cookie::getValue
				))
		).orElse(Collections.emptyMap());
	}

	public Optional<String> getUserSessionCookie(Map<String, String> cookies) {
		return Optional.ofNullable(cookies.get(PERSONLE_USER_SESSION_COOKIE_NAME));
	}

	public ResponseEntity.BodyBuilder buildResponseWithUserSessionCookie(UUID userSessionId) {
		String cookie = PERSONLE_USER_SESSION_COOKIE_NAME + "=" + userSessionTransformer.encodeSession(userSessionId);

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie);
	}
}
