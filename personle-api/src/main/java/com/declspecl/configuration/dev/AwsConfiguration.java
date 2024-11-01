package com.declspecl.configuration.dev;

import com.declspecl.dependencies.dynamodb.DailyGuessesItem;
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
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URI;

@Configuration
@Profile("dev")
public class AwsConfiguration {
	private final URI endpoint;
	private final Region region;
	private final String userGameDataTableName;

	@Autowired
	public AwsConfiguration(
			@Value("${aws.region}") String region,
			@Value("${aws.endpoint}") String endpoint,
			@Value("${aws.dynamodb.userGameData.tableName}") String userGameDataTableName
	) {
		this.region = Region.of(region);
		this.endpoint = URI.create(endpoint);
		this.userGameDataTableName = userGameDataTableName;
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
		return ddbClient.table(userGameDataTableName, userDailyGuessItemTableSchema);
	}

	@Bean
	public S3Client s3Client() {
		return S3Client.builder()
				.region(region)
				.endpointOverride(endpoint)
				.forcePathStyle(true) // https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-s3.html
				.build();
	}
}
