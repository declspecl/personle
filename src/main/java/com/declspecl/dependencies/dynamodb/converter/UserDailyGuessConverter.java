package com.declspecl.dependencies.dynamodb.converter;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.UUID;

@Component
public class UserDailyGuessConverter {
	public String serializePartitionKey(UUID userSessionId) {
		return userSessionId.toString();
	}

	public UUID deserializePartitionKey(String partitionKey) {
		return UUID.fromString(partitionKey);
	}

	public String serializeSortKey(LocalDateTime date) {
		String formattedDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(date);

		return "GUESS#" + formattedDate;
	}

	public TemporalAccessor deserializeDateFromSortKey(String sortKey) {
		String[] skPrefixAndDate = sortKey.split("#");

		return DateTimeFormatter.ofPattern("yyyy-MM-dd").parse(skPrefixAndDate[1]);
	}
}
