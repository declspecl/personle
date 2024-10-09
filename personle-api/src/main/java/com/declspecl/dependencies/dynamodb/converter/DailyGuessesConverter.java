package com.declspecl.dependencies.dynamodb.converter;

import com.declspecl.dependencies.dynamodb.model.DailyGuessesItem;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.ImmutableDailyGuesses;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class DailyGuessesConverter {
	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public String serializePartitionKey(UUID userSessionId) {
		return userSessionId.toString();
	}

	public UUID deserializePartitionKey(String partitionKey) {
		return UUID.fromString(partitionKey);
	}

	public String serializeSortKey(LocalDate date) {
		return "GUESS#" + DATE_TIME_FORMATTER.format(date);
	}

	public LocalDate deserializeDateFromSortKey(String sortKey) {
		String[] skPrefixAndDate = sortKey.split("#");
		return LocalDate.from(DATE_TIME_FORMATTER.parse(skPrefixAndDate[1]));
	}

	public DailyGuessesItem fromDomain(DailyGuesses dailyGuesses) {
		return new DailyGuessesItem(
				serializePartitionKey(dailyGuesses.userSessionId()),
				serializeSortKey(dailyGuesses.date()),
				dailyGuesses.guesses()
		);
	}

	public DailyGuesses fromItem(DailyGuessesItem item) {
		return ImmutableDailyGuesses.builder()
				.withUserSessionId(deserializePartitionKey(item.getUserSessionId()))
				.withDate(deserializeDateFromSortKey(item.getSk()))
				.withGuesses(item.getGuesses())
				.build();
	}
}
