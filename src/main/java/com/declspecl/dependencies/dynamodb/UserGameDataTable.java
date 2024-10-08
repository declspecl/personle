package com.declspecl.dependencies.dynamodb;

import com.declspecl.dependencies.dynamodb.converter.UserDailyGuessConverter;
import com.declspecl.dependencies.dynamodb.model.UserDailyGuessItem;
import com.declspecl.model.UserDailyGuess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UserGameDataTable {
	private final UserDailyGuessConverter converter;
	private final DynamoDbTable<UserDailyGuessItem> ddbTable;

	@Autowired
	public UserGameDataTable(
			UserDailyGuessConverter converter,
			DynamoDbTable<UserDailyGuessItem> ddbTable
	) {
		this.ddbTable = ddbTable;
		this.converter = converter;
	}

	public Optional<UserDailyGuess> getUserDailyGuessToday(UUID userSessionId) {
		return getUserDailyGuess(userSessionId, LocalDateTime.now(Clock.systemUTC()));
	}

	public Optional<UserDailyGuess> getUserDailyGuess(UUID userSessionId, LocalDateTime date) {
		UserDailyGuessItem item = ddbTable.getItem(
				Key.builder()
						.partitionValue(converter.serializePartitionKey(userSessionId))
						.sortValue(converter.serializeSortKey(date))
						.build()
		);

		return Optional.ofNullable(item).map(UserDailyGuess::fromDdbItem);
	}

	public Set<UserDailyGuess> getAllUserDailyGuesses(UUID userSessionId) {
		Key queryKey = Key.builder()
				.partitionValue(converter.serializePartitionKey(userSessionId))
				.sortValue("GUESS#")
				.build();

		QueryEnhancedRequest request = QueryEnhancedRequest.builder()
				.queryConditional(QueryConditional.sortBeginsWith(queryKey))
				.build();

		return ddbTable.query(request)
				.items()
				.stream()
				.map(UserDailyGuess::fromDdbItem)
				.collect(Collectors.toSet());
	}

	public void writeUserDailyGuess(UserDailyGuess userDailyGuess) {
		ddbTable.putItem(userDailyGuess.toDdbItem());
	}
}
