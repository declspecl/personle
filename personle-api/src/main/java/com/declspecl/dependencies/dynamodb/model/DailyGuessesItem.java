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
public class DailyGuessesItem {
	private String pk;
	private String sk;
	private String hashedUserSessionId;
	private List<String> guesses;

	@DynamoDbPartitionKey
	@DynamoDbAttribute("pk")
	public String getPk() {
		return pk;
	}

	@DynamoDbSortKey
	@DynamoDbAttribute("sk")
	public String getSk() {
		return sk;
	}

	@DynamoDbAttribute("value")
	public String getHashedUserSessionId() {
		return hashedUserSessionId;
	}

	@DynamoDbAttribute("guesses")
	public List<String> getGuesses() {
		return this.guesses;
	}
}
