package com.declspecl.controller;

import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionGenerator;
import com.declspecl.components.UserSessionTransformer;
import com.declspecl.controller.responses.GetUserGuessesResponse;
import com.declspecl.controller.responses.ImmutableGetUserGuessesResponse;
import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import com.declspecl.repository.DailyGuessesRepository;
import com.declspecl.repository.DailyPersonaRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GetDailyGuessControllerTest {
	@Mock
	private ControllerUtils controllerUtils;
	@Mock
	private UserSessionGenerator userSessionGenerator;
	@Mock
	private DailyPersonaRepository dailyPersonaRepository;
	@Mock
	private DailyGuessesRepository dailyGuessesRepository;
	@Mock
	private UserSessionTransformer userSessionTransformer;
	@InjectMocks
	private GetDailyGuessController getDailyGuessController;

	private static final LocalDate TEST_DATE = LocalDate.of(2024, 1, 1);
	private static final HashedUserSessionId TEST_SESSION_ID = new HashedUserSessionId("someHashedUserSessionId");
	private static final EncodedHashedUserSessionId TEST_ENCODED_SESSION_ID = new EncodedHashedUserSessionId("someEncodedHashedUserSessionId");
	private static final String TEST_SESSION_COOKIE = ControllerUtils.PERSONLE_USER_SESSION_COOKIE_NAME + "=" + TEST_ENCODED_SESSION_ID.value();

	@Test
	public void getsUserGuessesToday() throws ExecutionException {
		HttpServletRequest request = mock(HttpServletRequest.class);

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.of(TEST_ENCODED_SESSION_ID));
		when(dailyPersonaRepository.getPersonaForToday()).thenReturn(new PersonaName("Titania"));
		when(userSessionTransformer.decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID)).thenReturn(TEST_SESSION_ID);
		when(dailyGuessesRepository.getUserGuessesForToday(TEST_SESSION_ID)).thenReturn(Optional.of(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(List.of(new PersonaName("Oberon")))
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
				)
		);

		ResponseEntity<GetUserGuessesResponse> expectedResponse = ResponseEntity.ok(
				ImmutableGetUserGuessesResponse.builder()
						.withGuesses(List.of("Oberon"))
						.withTodayPersona("Titania")
						.build()
		);

		ResponseEntity<GetUserGuessesResponse> actualResponse = getDailyGuessController.getUserGuessesToday(request);

		assertEquals(actualResponse, expectedResponse);
		verify(controllerUtils).getUserSessionCookie(request);
		verify(dailyPersonaRepository).getPersonaForToday();
		verify(userSessionTransformer).decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID);
		verify(dailyGuessesRepository).getUserGuessesForToday(TEST_SESSION_ID);
		verifyNoInteractions(userSessionGenerator);
	}

	@Test
	public void buildsDefaultResponseForNewUserSession() throws ExecutionException {
		HttpServletRequest request = mock(HttpServletRequest.class);

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.empty());
		when(dailyPersonaRepository.getPersonaForToday()).thenReturn(new PersonaName("Titania"));
		when(userSessionGenerator.generateNewHashedUserSessionId()).thenReturn(TEST_SESSION_ID);
		when(userSessionTransformer.encodeHashedUserSessionId(TEST_SESSION_ID)).thenReturn(TEST_ENCODED_SESSION_ID);
		when(controllerUtils.buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID)).thenReturn(
				ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, TEST_SESSION_COOKIE)
		);

		ResponseEntity<GetUserGuessesResponse> expectedResponse = ResponseEntity.ok(
				ImmutableGetUserGuessesResponse.builder()
						.withGuesses(Collections.emptyList())
						.withTodayPersona("Titania")
						.build()
		);

		ResponseEntity<GetUserGuessesResponse> actualResponse = getDailyGuessController.getUserGuessesToday(request);

		assertEquals(actualResponse.getHeaders().get("Set-Cookie"), List.of(TEST_SESSION_COOKIE));
		assertEquals(actualResponse.getBody(), expectedResponse.getBody());
		verify(controllerUtils).getUserSessionCookie(request);
		verify(dailyPersonaRepository).getPersonaForToday();
		verify(userSessionGenerator).generateNewHashedUserSessionId();
		verify(userSessionTransformer).encodeHashedUserSessionId(TEST_SESSION_ID);
		verify(controllerUtils).buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID);
		verifyNoMoreInteractions(dailyGuessesRepository);
	}
}
