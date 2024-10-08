package com.declspecl.model;

import com.declspecl.dependencies.dynamodb.model.UserDailyGuessItem;
import org.immutables.value.Value;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.UUID;

@Value.Immutable
@Value.Style(init = "with*", get = { "is*", "get*" })
public abstract class UserDailyGuess {
	public abstract UUID userSessionId();
	public abstract LocalDateTime date();
	public abstract Set<String> guesses();

	public UserDailyGuessItem toDdbItem() {
		String formattedDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(date());
		String formattedSortKey = String.format("GUESS#%s", formattedDate);

		return new UserDailyGuessItem(
				userSessionId().toString(),
				formattedSortKey,
				guesses().stream().toList()
		);
	}

	public static UserDailyGuess fromDdbItem(UserDailyGuessItem item) {
		String[] skPrefixAndDate = item.getSk().split("#");
		LocalDateTime parsedDate = LocalDateTime.from(
				DateTimeFormatter.ofPattern("yyyy-MM-dd").parse(skPrefixAndDate[1])
		);

		return ImmutableUserDailyGuess.builder()
				.withUserSessionId(UUID.fromString(item.getUserSessionId()))
				.withDate(parsedDate)
				.withGuesses(item.getGuesses())
				.build();
	}
}
