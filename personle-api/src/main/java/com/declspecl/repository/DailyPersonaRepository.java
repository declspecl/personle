package com.declspecl.repository;

import com.declspecl.converter.FormattedDate;
import com.declspecl.converter.LocalDateConverter;
import com.declspecl.dependencies.s3.DailyPersonaS3Adapter;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Supplier;

@Log4j2
@Component
public class DailyPersonaRepository {
	private final List<String> personaNamePool;
	private final DailyPersonaS3Adapter s3Adapter;
	private final Supplier<LocalDate> todaySupplier;
	private final LocalDateConverter localDateConverter;
	private final LoadingCache<FormattedDate, String> dailyPersonaCache;


	@Autowired
	public DailyPersonaRepository(
			DailyPersonaS3Adapter s3Adapter,
			Supplier<LocalDate> todaySupplier,
			LocalDateConverter localDateConverter,
			@Qualifier("PersonaNamePool") List<String> personaNamePool
	) {
		this.s3Adapter = s3Adapter;
		this.personaNamePool = personaNamePool;
		this.todaySupplier = todaySupplier;
		this.localDateConverter = localDateConverter;

		this.dailyPersonaCache = CacheBuilder.newBuilder()
				.maximumSize(30)
				.expireAfterWrite(Duration.ofDays(20))
				.build(
						new CacheLoader<>() {
							@Override
							public String load(FormattedDate date) {
								Optional<String> personaName = s3Adapter.fetchPersonaFromS3(date);
								if (personaName.isPresent()) {
									return personaName.get();
								}

								String nextPersonaName = getRandomPersonaName();
								s3Adapter.putPersonaObjectToS3(date, nextPersonaName);

								return nextPersonaName;
							}
						}
				);
	}

	public String getPersonaForToday() throws ExecutionException {
		return dailyPersonaCache.get(localDateConverter.convertDateToString(todaySupplier.get()));
	}

	private String getRandomPersonaName() {
		return personaNamePool.get(ThreadLocalRandom.current().nextInt(0, personaNamePool.size()));
	}
}
