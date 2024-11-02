package com.declspecl.dependencies.dynamodb;

import com.declspecl.converter.FormattedDate;
import com.declspecl.converter.LocalDateConverter;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DailyGuessesConverterTest {
	@Mock
	private LocalDateConverter localDateConverter;
	@InjectMocks
	private DailyGuessesConverter dailyGuessesConverter;

	private static final LocalDate TEST_DATE = LocalDate.of(2024, 1, 1);
	private static final HashedUserSessionId TEST_HASHED_USER_SESSION_ID = new HashedUserSessionId("someHashedUserSessionId");

	@Test
	public void serializesPartitionKey() {
		String expectedPartitionKey = "USER#someHashedUserSessionId";
		assertEquals(dailyGuessesConverter.serializePartitionKey(TEST_HASHED_USER_SESSION_ID), expectedPartitionKey);
	}

	@Test
	public void deserializesHashedUserSessionIdFromPartitionKey() {
		String partitionKey = "USER#someHashedUserSessionId";
		assertEquals(dailyGuessesConverter.deserializeHashedUserSessionIdFromPartitionKey(partitionKey), TEST_HASHED_USER_SESSION_ID);
	}

	@Test
	public void serializesSortKey() {
		when(localDateConverter.convertDateToString(TEST_DATE)).thenReturn(new FormattedDate("2024-01-01"));

		String expectedSortKey = "GUESS#2024-01-01";

		assertEquals(dailyGuessesConverter.serializeSortKey(TEST_DATE), expectedSortKey);
	}

	@Test
	public void deserializesDateFromSortKey() {
		when(localDateConverter.parseDateFromString("2024-01-01")).thenReturn(TEST_DATE);

		String sortKey = "GUESS#2024-01-01";

		assertEquals(dailyGuessesConverter.deserializeDateFromSortKey(sortKey), TEST_DATE);
	}

	@Test
	public void convertsDailyGuessesItemToDailyGuesses() {
		when(localDateConverter.parseDateFromString("2024-01-01")).thenReturn(TEST_DATE);

		DailyGuessesItem dailyGuessesItem = new DailyGuessesItem(
				"USER#someHashedUserSessionId",
				"GUESS#2024-01-01",
				List.of("persona1", "persona2")
		);

		DailyGuesses expectedDailyGuesses = ImmutableDailyGuesses.builder()
				.withHashedUserSessionId(TEST_HASHED_USER_SESSION_ID)
				.withDate(TEST_DATE)
				.withGuesses(List.of(new PersonaName("persona1"), new PersonaName("persona2")))
				.build();

		assertEquals(dailyGuessesConverter.fromItem(dailyGuessesItem), expectedDailyGuesses);
	}

	@Test
	public void convertsDailyGuessesToDailyGuessesItem() {
		when(localDateConverter.convertDateToString(TEST_DATE)).thenReturn(new FormattedDate("2024-01-01"));

		DailyGuesses dailyGuesses = ImmutableDailyGuesses.builder()
				.withHashedUserSessionId(TEST_HASHED_USER_SESSION_ID)
				.withDate(TEST_DATE)
				.withGuesses(List.of(new PersonaName("persona1"), new PersonaName("persona2")))
				.build();

		DailyGuessesItem expectedDailyGuessesItem = new DailyGuessesItem(
				"USER#someHashedUserSessionId",
				"GUESS#2024-01-01",
				List.of("persona1", "persona2")
		);

		assertEquals(dailyGuessesConverter.fromDomain(dailyGuesses), expectedDailyGuessesItem);
	}
}
