package com.declspecl.dependencies.dynamodb.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.util.List;

@Setter
@ToString
@DynamoDbBean
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserDailyGuessItem {
	private String userSessionId;
	private String sk;
	private List<String> guesses;

	@DynamoDbPartitionKey
	@DynamoDbAttribute("userSessionId")
	public String getUserSessionId() {
		return userSessionId;
	}

	@DynamoDbSortKey
	@DynamoDbAttribute("sk")
	public String getSk() {
		return sk;
	}

	@DynamoDbAttribute("guesses")
	public List<String> getGuesses() {
		return this.guesses;
	}
}
