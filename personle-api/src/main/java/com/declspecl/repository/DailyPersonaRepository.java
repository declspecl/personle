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
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Supplier;

@Log4j2
@Component
public class DailyPersonaRepository {
	private final List<String> personaNames;
	private final DailyPersonaS3Adapter s3Adapter;
	private final Supplier<LocalDate> todaySupplier;
	private final LocalDateConverter localDateConverter;
	private final LoadingCache<FormattedDate, String> dailyPersonaCache;


	@Autowired
	public DailyPersonaRepository(
			DailyPersonaS3Adapter s3Adapter,
			Supplier<LocalDate> todaySupplier,
			LocalDateConverter localDateConverter,
			@Qualifier("PersonaNames") List<String> personaNames
	) {
		this.s3Adapter = s3Adapter;
		this.personaNames = personaNames;
		this.todaySupplier = todaySupplier;
		this.localDateConverter = localDateConverter;

		this.dailyPersonaCache = CacheBuilder.newBuilder()
				.maximumSize(30)
				.expireAfterWrite(Duration.ofDays(20))
				.build(
						new CacheLoader<>() {
							@Override
							public String load(FormattedDate key) throws Exception {
								Optional<String> personaName = s3Adapter.fetchPersonaFromS3(key);
							}
						}
				);
	}

	public Optional<String> getPersonaForToday() {
		return s3Adapter.fetchPersonaFromS3(localDateConverter.convertDateToString(todaySupplier.get()));
	}

	private String getRandomPersonaName() {
		return personaNames.get(ThreadLocalRandom.current().nextInt(0, personaNames.size()));
	}
}
