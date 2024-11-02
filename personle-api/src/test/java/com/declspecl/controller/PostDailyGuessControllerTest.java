package com.declspecl.controller;

import com.declspecl.PersonleApiConstants;
import com.declspecl.components.ControllerUtils;
import com.declspecl.components.UserSessionGenerator;
import com.declspecl.components.UserSessionTransformer;
import com.declspecl.controller.requests.ImmutablePostUserGuessRequest;
import com.declspecl.controller.requests.PostUserGuessRequest;
import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import com.declspecl.repository.DailyGuessesRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostDailyGuessControllerTest {
	@Mock
	private ControllerUtils controllerUtils;
	@Mock
	private Supplier<LocalDate> todaySupplier;
	@Mock
	private UserSessionGenerator userSessionGenerator;
	@Mock
	private DailyGuessesRepository dailyGuessesRepository;
	@Mock
	private UserSessionTransformer userSessionTransformer;
	private PostDailyGuessController postDailyGuessController;

	private static final LocalDate TEST_DATE = LocalDate.of(2024, 1, 1);
	private static final HashedUserSessionId TEST_SESSION_ID = new HashedUserSessionId("someHashedUserSessionId");
	private static final EncodedHashedUserSessionId TEST_ENCODED_SESSION_ID = new EncodedHashedUserSessionId("someEncodedHashedUserSessionId");
	private static final String TEST_SESSION_COOKIE = ControllerUtils.PERSONLE_USER_SESSION_COOKIE_NAME + "=" + TEST_ENCODED_SESSION_ID.value();

	@BeforeEach
	public void setup() {
		postDailyGuessController = new PostDailyGuessController(
				controllerUtils,
				todaySupplier,
				userSessionGenerator,
				dailyGuessesRepository,
				userSessionTransformer,
				List.of(new PersonaName("Titania"), new PersonaName("Oberon"))
		);
	}

	@Test
	public void undefinedPersonaGuessReturns400() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		PostUserGuessRequest payload = ImmutablePostUserGuessRequest.of("Loki");

		ResponseEntity<Void> response = postDailyGuessController.postUserGuess(request, payload);
		assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(400));
	}

	@Test
	public void tooManyGuessesReturns429() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		PostUserGuessRequest payload = ImmutablePostUserGuessRequest.of("Titania");

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.of(TEST_ENCODED_SESSION_ID));
		when(userSessionTransformer.decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID)).thenReturn(TEST_SESSION_ID);

		List<PersonaName> maxExistingGuesses = new ArrayList<>(PersonleApiConstants.MAX_DAILY_GUESSES);
		for (int i = 0; i < PersonleApiConstants.MAX_DAILY_GUESSES; i++) {
			maxExistingGuesses.add(new PersonaName("somePersona" + (i + 1)));
		}
		when(dailyGuessesRepository.getUserGuessesForToday(TEST_SESSION_ID)).thenReturn(Optional.of(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(maxExistingGuesses)
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
		));

		ResponseEntity<Void> response = postDailyGuessController.postUserGuess(request, payload);

		assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(429));
		verify(controllerUtils).getUserSessionCookie(request);
		verify(userSessionTransformer).decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID);
		verify(dailyGuessesRepository).getUserGuessesForToday(TEST_SESSION_ID);
		verifyNoMoreInteractions(dailyGuessesRepository);
		verifyNoInteractions(userSessionGenerator);
		verifyNoInteractions(todaySupplier);
	}

	@Test
	public void postsUserGuessWithSessionCookieAndExistingGuesses() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		PostUserGuessRequest payload = ImmutablePostUserGuessRequest.of("Titania");

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.of(TEST_ENCODED_SESSION_ID));
		when(userSessionTransformer.decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID)).thenReturn(TEST_SESSION_ID);
		when(dailyGuessesRepository.getUserGuessesForToday(TEST_SESSION_ID)).thenReturn(Optional.of(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(List.of(new PersonaName("Oberon")))
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
				)
		);

		ResponseEntity<Void> response = postDailyGuessController.postUserGuess(request, payload);

		assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
		verify(controllerUtils).getUserSessionCookie(request);
		verify(userSessionTransformer).decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID);
		verify(dailyGuessesRepository).getUserGuessesForToday(TEST_SESSION_ID);
		verify(dailyGuessesRepository).writeDailyGuesses(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(List.of(new PersonaName("Oberon"), new PersonaName("Titania")))
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
		);
		verify(userSessionTransformer, never()).encodeHashedUserSessionId(TEST_SESSION_ID);
		verify(controllerUtils, never()).buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID);
		verifyNoInteractions(userSessionGenerator);
		verifyNoInteractions(todaySupplier);
	}

	@Test
	public void postsUserGuessWithoutSessionCookie() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		PostUserGuessRequest payload = ImmutablePostUserGuessRequest.of("Titania");

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.empty());
		when(userSessionGenerator.generateNewHashedUserSessionId()).thenReturn(TEST_SESSION_ID);
		when(userSessionTransformer.encodeHashedUserSessionId(TEST_SESSION_ID)).thenReturn(TEST_ENCODED_SESSION_ID);
		when(todaySupplier.get()).thenReturn(TEST_DATE);
		when(controllerUtils.buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID)).thenReturn(
				ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, TEST_SESSION_COOKIE)
		);

		ResponseEntity<Void> response = postDailyGuessController.postUserGuess(request, payload);

		assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
		assertEquals(response.getHeaders().get(HttpHeaders.SET_COOKIE), List.of(TEST_SESSION_COOKIE));
		verify(controllerUtils).getUserSessionCookie(request);
		verify(userSessionGenerator).generateNewHashedUserSessionId();
		verify(userSessionTransformer).encodeHashedUserSessionId(TEST_SESSION_ID);
		verify(userSessionTransformer, never()).decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID);
		verify(controllerUtils).buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID);
		verify(dailyGuessesRepository, never()).getUserGuessesForDay(TEST_SESSION_ID, TEST_DATE);
		verify(todaySupplier).get();
		verify(dailyGuessesRepository).writeDailyGuesses(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(List.of(new PersonaName("Titania")))
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
		);
		verify(userSessionTransformer).encodeHashedUserSessionId(TEST_SESSION_ID);
	}

	@Test
	public void postsUserGuessWithSessionCookieAndNoExistingGuesses() {
		HttpServletRequest request = mock(HttpServletRequest.class);
		PostUserGuessRequest payload = ImmutablePostUserGuessRequest.of("Titania");

		when(controllerUtils.getUserSessionCookie(request)).thenReturn(Optional.of(TEST_ENCODED_SESSION_ID));
		when(userSessionTransformer.decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID)).thenReturn(TEST_SESSION_ID);
		when(dailyGuessesRepository.getUserGuessesForToday(TEST_SESSION_ID)).thenReturn(Optional.empty());
		when(userSessionTransformer.encodeHashedUserSessionId(TEST_SESSION_ID)).thenReturn(TEST_ENCODED_SESSION_ID);
		when(todaySupplier.get()).thenReturn(TEST_DATE);
		when(controllerUtils.buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID)).thenReturn(
				ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, TEST_SESSION_COOKIE)
		);

		ResponseEntity<Void> response = postDailyGuessController.postUserGuess(request, payload);

		assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
		verify(controllerUtils).getUserSessionCookie(request);
		verify(userSessionTransformer).decodeEncodedHashedUserSessionId(TEST_ENCODED_SESSION_ID);
		verify(dailyGuessesRepository).getUserGuessesForToday(TEST_SESSION_ID);
		verify(dailyGuessesRepository).writeDailyGuesses(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withGuesses(List.of(new PersonaName("Titania")))
						.withHashedUserSessionId(TEST_SESSION_ID)
						.build()
		);
		verify(userSessionTransformer).encodeHashedUserSessionId(TEST_SESSION_ID);
		verify(todaySupplier).get();
		verify(controllerUtils).buildResponseWithUserSessionCookie(TEST_ENCODED_SESSION_ID);
	}
}
