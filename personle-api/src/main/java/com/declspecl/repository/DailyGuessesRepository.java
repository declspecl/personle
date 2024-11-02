package com.declspecl.repository;

import com.declspecl.dependencies.dynamodb.DailyGuessesConverter;
import com.declspecl.dependencies.dynamodb.DailyGuessesItem;
import com.declspecl.model.DailyGuesses;
import com.declspecl.model.HashedUserSessionId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;

import java.time.LocalDate;
import java.util.Optional;
import java.util.function.Supplier;

@Component
public class DailyGuessesRepository {
	private final DailyGuessesConverter converter;
	private final Supplier<LocalDate> todaySupplier;
	private final DynamoDbTable<DailyGuessesItem> ddbTable;

	@Autowired
	public DailyGuessesRepository(
			DailyGuessesConverter converter,
			Supplier<LocalDate> todaySupplier,
			DynamoDbTable<DailyGuessesItem> ddbTable
	) {
		this.ddbTable = ddbTable;
		this.converter = converter;
		this.todaySupplier = todaySupplier;
	}

	public Optional<DailyGuesses> getUserGuessesForToday(HashedUserSessionId hashedUserSessionId) {
		return getUserGuessesForDay(hashedUserSessionId, todaySupplier.get());
	}

	public Optional<DailyGuesses> getUserGuessesForDay(HashedUserSessionId hashedUserSessionId, LocalDate date) {
		DailyGuessesItem item = ddbTable.getItem(
				Key.builder()
						.partitionValue(converter.serializePartitionKey(hashedUserSessionId))
						.sortValue(converter.serializeSortKey(date))
						.build()
		);

		return Optional.ofNullable(item).map(converter::fromItem);
	}

	public void writeDailyGuesses(DailyGuesses dailyGuesses) {
		ddbTable.putItem(converter.fromDomain(dailyGuesses));
	}
}
