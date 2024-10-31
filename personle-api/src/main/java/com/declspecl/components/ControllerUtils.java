package com.declspecl.components;

import com.declspecl.model.EncodedHashedUserSessionId;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ControllerUtils {
	public static final String PERSONLE_USER_SESSION_COOKIE_NAME = "personle.v1";

	public Map<String, String> buildCookieMap(HttpServletRequest request) {
		Optional<Cookie[]> maybeCookies = Optional.ofNullable(request.getCookies());

		return maybeCookies.map(cookies -> Arrays.stream(cookies).collect(
				Collectors.toMap(
						Cookie::getName,
						Cookie::getValue
				))
		).orElse(Collections.emptyMap());
	}

	public Optional<EncodedHashedUserSessionId> getUserSessionCookie(Map<String, String> cookies) {
		return Optional.ofNullable(cookies.get(PERSONLE_USER_SESSION_COOKIE_NAME)).map(EncodedHashedUserSessionId::new);
	}

	public ResponseEntity.BodyBuilder buildResponseWithUserSessionCookie(EncodedHashedUserSessionId encodedHashedUserSessionId) {
		String cookie = PERSONLE_USER_SESSION_COOKIE_NAME + "=" + encodedHashedUserSessionId.value();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie);
	}
}
