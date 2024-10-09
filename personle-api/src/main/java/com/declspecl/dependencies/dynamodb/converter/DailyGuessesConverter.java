package com.declspecl.dependencies.dynamodb.converter;

import com.declspecl.converter.LocalDateConverter;
import com.declspecl.dependencies.dynamodb.model.DailyGuessesItem;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.ImmutableDailyGuesses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class DailyGuessesConverter {
	private final LocalDateConverter localDateConverter;

	@Autowired
	public DailyGuessesConverter(LocalDateConverter localDateConverter) {
		this.localDateConverter = localDateConverter;
	}

	public String serializePartitionKey(UUID userSessionId) {
		return userSessionId.toString();
	}

	public UUID deserializePartitionKey(String partitionKey) {
		return UUID.fromString(partitionKey);
	}

	public String serializeSortKey(LocalDate date) {
		return "GUESS#" + localDateConverter.convertDateToString(date).value();
	}

	public LocalDate deserializeDateFromSortKey(String sortKey) {
		String[] skPrefixAndDate = sortKey.split("#");
		return localDateConverter.parseDateFromString(skPrefixAndDate[1]);
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
