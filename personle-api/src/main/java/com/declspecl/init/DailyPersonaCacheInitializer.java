package com.declspecl.init;

import com.declspecl.converter.LocalDateConverter;
import com.declspecl.repository.DailyPersonaRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.concurrent.ExecutionException;

@Log4j2
@Component
public class DailyPersonaCacheInitializer {
    private final LocalDateConverter localDateConverter;
    private final DailyPersonaRepository dailyPersonaRepository;

    @Autowired
    public DailyPersonaCacheInitializer(
            final LocalDateConverter localDateConverter,
            final DailyPersonaRepository dailyPersonaRepository
    ) {
        this.localDateConverter = localDateConverter;
        this.dailyPersonaRepository = dailyPersonaRepository;
    }

    public void initialize() throws ExecutionException {
        log.info("Starting daily persona cache initialization");

        LocalDate today = LocalDate.now();

        for (int i = 0; i < 15; i++) {
            LocalDate daysAgo = today.minusDays(i);
            dailyPersonaRepository.getPersonaForDay(daysAgo);
        }

        log.info("Finished caching last 15 days of personas");
    }
}
