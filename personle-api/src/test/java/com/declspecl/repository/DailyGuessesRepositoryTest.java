package com.declspecl.repository;

import com.declspecl.dependencies.dynamodb.DailyGuessesConverter;
import com.declspecl.dependencies.dynamodb.DailyGuessesItem;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DailyGuessesRepositoryTest {
	@Mock
	private DailyGuessesConverter converter;
	@Mock
	private Supplier<LocalDate> todaySupplier;
	@Mock
	private DynamoDbTable<DailyGuessesItem> ddbTable;
	@InjectMocks
	private DailyGuessesRepository dailyGuessesRepository;

	private static final LocalDate TEST_DATE = LocalDate.of(2024, 1, 1);
	private static final HashedUserSessionId TEST_HASHED_USER_SESSION_ID = new HashedUserSessionId("someHashedUserSessionId");

	@Test
	public void getsUserGuessesForToday() {
		when(todaySupplier.get()).thenReturn(TEST_DATE);

		DailyGuessesItem dailyGuessesItem = new DailyGuessesItem(
				"USER#someHashedUserSessionId",
				"GUESS#2024-01-01",
				List.of("Titania")
		);

		ArgumentCaptor<Key> keyCaptor = ArgumentCaptor.forClass(Key.class);
		when(ddbTable.getItem(keyCaptor.capture())).thenReturn(dailyGuessesItem);

		when(converter.serializePartitionKey(TEST_HASHED_USER_SESSION_ID)).thenReturn("USER#someHashedUserSessionId");
		when(converter.serializeSortKey(TEST_DATE)).thenReturn("GUESS#2024-01-01");
		when(converter.fromItem(dailyGuessesItem)).thenReturn(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withHashedUserSessionId(TEST_HASHED_USER_SESSION_ID)
						.withGuesses(List.of(new PersonaName("Titania")))
						.build()
		);

		Optional<DailyGuesses> expectedDailyGuesses = Optional.of(
				ImmutableDailyGuesses.builder()
						.withDate(TEST_DATE)
						.withHashedUserSessionId(TEST_HASHED_USER_SESSION_ID)
						.withGuesses(List.of(new PersonaName("Titania")))
						.build()
		);

		assertEquals(
				dailyGuessesRepository.getUserGuessesForToday(TEST_HASHED_USER_SESSION_ID),
				expectedDailyGuesses
		);

		assertEquals(keyCaptor.getValue().partitionKeyValue().s(), "USER#someHashedUserSessionId");
		assertTrue(keyCaptor.getValue().sortKeyValue().isPresent());
		assertEquals(keyCaptor.getValue().sortKeyValue().get().s(), "GUESS#2024-01-01");

		verify(todaySupplier).get();
		verify(ddbTable).getItem(any(Key.class));
		verify(converter).fromItem(dailyGuessesItem);
	}

	@Test
	public void writesDailyGuess() {
		DailyGuesses dailyGuesses = ImmutableDailyGuesses.builder()
				.withDate(TEST_DATE)
				.withHashedUserSessionId(TEST_HASHED_USER_SESSION_ID)
				.withGuesses(List.of(new PersonaName("Titania")))
				.build();

		DailyGuessesItem expectedDailyGuessesItem = new DailyGuessesItem(
				"USER#someHashedUserSessionId",
				"GUESS#2024-01-01",
				List.of("Titania")
		);

		when(converter.fromDomain(dailyGuesses)).thenReturn(expectedDailyGuessesItem);

		dailyGuessesRepository.writeDailyGuesses(dailyGuesses);

		verify(converter).fromDomain(dailyGuesses);
		verify(ddbTable).putItem(expectedDailyGuessesItem);
	}
}
