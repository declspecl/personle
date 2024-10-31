package com.declspecl.repository;

import com.declspecl.converter.FormattedDate;
import com.declspecl.converter.LocalDateConverter;
import com.declspecl.dependencies.s3.DailyPersonaS3Adapter;
import com.declspecl.model.PersonaName;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Supplier;

@Log4j2
@Component
public class DailyPersonaRepository {
	private final List<PersonaName> personaNamePool;
	private final DailyPersonaS3Adapter s3Adapter;
	private final Supplier<LocalDate> todaySupplier;
	private final LocalDateConverter localDateConverter;
	private final LoadingCache<FormattedDate, PersonaName> dailyPersonaCache;


	@Autowired
	public DailyPersonaRepository(
			DailyPersonaS3Adapter s3Adapter,
			Supplier<LocalDate> todaySupplier,
			LocalDateConverter localDateConverter,
			@Qualifier("PersonaNamePool") List<PersonaName> personaNamePool
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
							public PersonaName load(FormattedDate date) {
								Optional<PersonaName> personaName = s3Adapter.fetchPersonaForDay(date);
								if (personaName.isPresent()) {
									return personaName.get();
								}

								PersonaName nextPersonaName = getRandomPersonaName();
								s3Adapter.putPersonaObjectToS3(date, nextPersonaName);

								return nextPersonaName;
							}
						}
				);
	}

	public PersonaName getPersonaForDay(LocalDate date) throws ExecutionException {
		return dailyPersonaCache.get(localDateConverter.convertDateToString(date));
	}

	public PersonaName getPersonaForToday() throws ExecutionException {
		return getPersonaForDay(todaySupplier.get());
	}

	private PersonaName getRandomPersonaName() {
		ConcurrentMap<FormattedDate, PersonaName> map = dailyPersonaCache.asMap();
		Collection<PersonaName> values = map.values();

		PersonaName randomPersonaName;
		do {
			randomPersonaName = personaNamePool.get(ThreadLocalRandom.current().nextInt(0, personaNamePool.size()));
		} while (values.contains(randomPersonaName));
		// cache holds persona names for 30 days, aim to get persona that hasn't been used in 30 days

		return randomPersonaName;
	}
}
