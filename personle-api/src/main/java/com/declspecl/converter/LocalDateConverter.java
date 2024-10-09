package com.declspecl.converter;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class LocalDateConverter {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public LocalDate parseDateFromString(String value) {
        return LocalDate.from(DATE_TIME_FORMATTER.parse(value));
    }

    public FormattedDate convertDateToString(LocalDate date) {
        return new FormattedDate(DATE_TIME_FORMATTER.format(date));
    }
}
