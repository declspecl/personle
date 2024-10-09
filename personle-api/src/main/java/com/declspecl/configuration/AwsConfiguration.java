package com.declspecl.configuration;

import com.declspecl.dependencies.dynamodb.model.DailyGuessesItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.net.URI;

@Configuration
@Profile("dev")
public class AwsConfiguration {
	private final Region region;
	private final URI endpoint;
	private final String tableName;

	@Autowired
	public AwsConfiguration(
			@Value("${dynamodb.region}") String region,
			@Value("${dynamodb.endpoint}") String endpoint,
			@Value("${dynamodb.userGameData.tableName}") String tableName
	) {
		this.region = Region.of(region);
		this.endpoint = URI.create(endpoint);
		this.tableName = tableName;
	}

	@Bean
	public DynamoDbClient dynamoDbClient() {
		return DynamoDbClient.builder()
				.region(region)
				.endpointOverride(endpoint)
				.build();
	}

	@Bean
	public DynamoDbEnhancedClient dynamoDbEnhancedClient(DynamoDbClient dynamoDbClient) {
		return DynamoDbEnhancedClient.builder()
				.dynamoDbClient(dynamoDbClient)
				.build();
	}

	@Bean
	public TableSchema<DailyGuessesItem> userDailyGuessItemTableSchema() {
		return TableSchema.fromBean(DailyGuessesItem.class);
	}

	@Bean
	public DynamoDbTable<DailyGuessesItem> userDailyGuessItemDynamoDbTable(
			DynamoDbEnhancedClient ddbClient,
			TableSchema<DailyGuessesItem> userDailyGuessItemTableSchema
	) {
		return ddbClient.table(tableName, userDailyGuessItemTableSchema);
	}
}
