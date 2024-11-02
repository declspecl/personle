package com.declspecl.dependencies.dynamodb;

import com.declspecl.converter.LocalDateConverter;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.HashedUserSessionId;
import com.declspecl.model.ImmutableDailyGuesses;
import com.declspecl.model.PersonaName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DailyGuessesConverter {
	private final LocalDateConverter localDateConverter;

	@Autowired
	public DailyGuessesConverter(LocalDateConverter localDateConverter) {
		this.localDateConverter = localDateConverter;
	}

	public String serializePartitionKey(HashedUserSessionId hashedUserSessionId) {
		return "USER#" + hashedUserSessionId.value();
	}

	public HashedUserSessionId deserializeHashedUserSessionIdFromPartitionKey(String partitionKey) {
		return new HashedUserSessionId(partitionKey.split("#")[1]);
	}

	public String serializeSortKey(LocalDate date) {
		return "GUESS#" + localDateConverter.convertDateToString(date).date();
	}

	public LocalDate deserializeDateFromSortKey(String sortKey) {
		return localDateConverter.parseDateFromString(sortKey.split("#")[1]);
	}

	public DailyGuessesItem fromDomain(DailyGuesses dailyGuesses) {
		return new DailyGuessesItem(
				serializePartitionKey(dailyGuesses.hashedUserSessionId()),
				serializeSortKey(dailyGuesses.date()),
				dailyGuesses.guesses().stream().map(PersonaName::value).toList()
		);
	}

	public DailyGuesses fromItem(DailyGuessesItem item) {
		return ImmutableDailyGuesses.builder()
				.withHashedUserSessionId(deserializeHashedUserSessionIdFromPartitionKey(item.getPk()))
				.withDate(deserializeDateFromSortKey(item.getSk()))
				.withGuesses(item.getGuesses().stream().map(PersonaName::new).toList())
				.build();
	}
}
