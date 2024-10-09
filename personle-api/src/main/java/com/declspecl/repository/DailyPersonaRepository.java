package com.declspecl.repository;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Log4j2
@Component
public class DailyPersonaRepository {
	private final String bucketName;
	private final S3Client s3Client;
	private final List<String> personaNames;
	private final Supplier<LocalDate> todaySupplier;
	private final LoadingCache<GetObjectRequest, String> dailyPersonaCache;

	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Autowired
	public DailyPersonaRepository(
			S3Client s3Client,
			Supplier<LocalDate> todaySupplier,
			@Qualifier("PersonaNames") List<String> personaNames,
			@Value("${aws.s3.dailyPersonas.bucketName}") String bucketName
	) {
		this.s3Client = s3Client;
		this.bucketName = bucketName;
		this.personaNames = personaNames;
		this.todaySupplier = todaySupplier;

		this.dailyPersonaCache = CacheBuilder.newBuilder()
				.maximumSize(30)
				.expireAfterWrite(Duration.ofDays(20))
				.build(
						new CacheLoader<>() {
							@Override
							public String load(@NonNull GetObjectRequest key) throws Exception {
								LocalDate date = LocalDate.from(DATE_TIME_FORMATTER.parse(key.key()));
								return fetchPersonaFromS3AndComputeIfAbsent(date);
							}
						}
				);
	}

	public Optional<String> getPersonaForToday() {
		return getPersonaForDate(todaySupplier.get());
	}

	public Optional<String> getPersonaForDate(LocalDate date) {
		GetObjectRequest request = GetObjectRequest.builder()
				.bucket(bucketName)
				.key(getObjectKey(date))
				.build();

		try {
			return Optional.of(dailyPersonaCache.get(request));
		}
		catch (Exception e) {
			log.error("Failed to fetch persona for date {}", date, e);
			return Optional.empty();
		}
	}

	public void putPersonaForDate(String personaName, LocalDate date) {
		PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(bucketName)
				.key(getObjectKey(date))
				.build();

		s3Client.putObject(putObjectRequest, RequestBody.fromString(personaName));
	}

	private String fetchPersonaFromS3(GetObjectRequest request) throws IOException {
		ResponseInputStream<GetObjectResponse> response = s3Client.getObject(request);

		try (BufferedReader reader = new BufferedReader(new InputStreamReader(response))) {
			return reader.readLine();
		}
	}

	private String fetchPersonaFromS3AndComputeIfAbsent(LocalDate date) throws IOException {
		GetObjectRequest request = GetObjectRequest.builder()
				.bucket(bucketName)
				.key(getObjectKey(date))
				.build();

		try {
			return fetchPersonaFromS3(request);
		}
		catch (IOException e) {
			log.error("Failed to fetch", e);

			Set<String> duplicatePersonaNames = new HashSet<>(dailyPersonaCache.asMap().values());
			System.out.println(duplicatePersonaNames);

			String nextPersonaName;
			do {
				nextPersonaName = getRandomPersonaName();
			} while (!duplicatePersonaNames.contains(nextPersonaName));

			putPersonaForDate(nextPersonaName, date);
		} catch (Exception e) {
			// TODO
			System.out.println(e);
			log.error("Unexpected fatal error", e);
		}

		return fetchPersonaFromS3(request);
	}

	private String getRandomPersonaName() {
		return personaNames.get(ThreadLocalRandom.current().nextInt(0, personaNames.size()));
	}

	private String getObjectKey(LocalDate date) {
		return DATE_TIME_FORMATTER.format(date);
	}
}
