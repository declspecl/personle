package com.declspecl.components;

import com.declspecl.model.EncodedHashedUserSessionId;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ControllerUtilsTest {
	private ControllerUtils controllerUtils;

	@BeforeEach
	public void setup() {
		controllerUtils = new ControllerUtils();
	}

	private static final String TEST_SESSION_ID = "someSessionId";
	private static final Cookie TEST_SESSION_COOKIE = new Cookie(ControllerUtils.PERSONLE_USER_SESSION_COOKIE_NAME, TEST_SESSION_ID);
	private static final Cookie[] TEST_COOKIES = { TEST_SESSION_COOKIE };

	@Test
	public void buildsNonEmptyCookieMapWithCookies() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getCookies()).thenReturn(TEST_COOKIES);

		Map<String, String> cookieMap = controllerUtils.buildCookieMap(request);

		assertEquals(cookieMap.size(), 1);
		assertEquals(cookieMap.get(ControllerUtils.PERSONLE_USER_SESSION_COOKIE_NAME), TEST_SESSION_ID);
	}

	@Test
	public void buildsEmptyCookieMapWithNullCookies() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getCookies()).thenReturn(null);

		Map<String, String> cookieMap = controllerUtils.buildCookieMap(request);

		assertEquals(cookieMap, Collections.emptyMap());
	}

	@Test
	public void getsUserSessionCookieFromValidCookies() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getCookies()).thenReturn(TEST_COOKIES);

		Optional<EncodedHashedUserSessionId> sessionId = controllerUtils.getUserSessionCookie(request);

		assertTrue(sessionId.isPresent());
		assertEquals(sessionId.get().value(), TEST_SESSION_ID);
	}

	@Test
	public void doesNotGetUserSessionCookieFromEmptyCookieMap() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getCookies()).thenReturn(null);

		Optional<EncodedHashedUserSessionId> sessionId = controllerUtils.getUserSessionCookie(request);

		assertTrue(sessionId.isEmpty());
	}

	@Test
	public void doesNotGetUserSessionCookieFromCookieMapWithoutSessionCookie() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		when(request.getCookies()).thenReturn(new Cookie[] { new Cookie("someOtherCookie", "someOtherValue") });

		Optional<EncodedHashedUserSessionId> sessionId = controllerUtils.getUserSessionCookie(request);

		assertTrue(sessionId.isEmpty());
	}

	@Test
	public void buildsResponseWithUserSessionCookie() {
		EncodedHashedUserSessionId sessionId = new EncodedHashedUserSessionId(TEST_SESSION_ID);

		ResponseEntity<?> expectedResponse = ResponseEntity.ok()
				.header("Set-Cookie", ControllerUtils.PERSONLE_USER_SESSION_COOKIE_NAME + "=" + TEST_SESSION_ID)
				.build();

		assertEquals(controllerUtils.buildResponseWithUserSessionCookie(sessionId).build(), expectedResponse);
	}
}