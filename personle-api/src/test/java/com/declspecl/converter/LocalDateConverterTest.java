package com.declspecl.converter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class LocalDateConverterTest {
    private LocalDateConverter localDateConverter;

    @BeforeEach
    public void setup() {
        localDateConverter = new LocalDateConverter();
    }

    @Test
    public void parsesDateFromString() {
        String date = "2024-01-01";
        LocalDate expectedDate = LocalDate.of(2024, 1, 1);

        assertEquals(expectedDate, localDateConverter.parseDateFromString(date));
    }

    @Test
    public void throwsExceptionWhenParsingInvalidDate() {
        String date = "2024-01-01-01";

        assertThrows(DateTimeParseException.class, () -> localDateConverter.parseDateFromString(date));
    }

    @Test
    public void convertsDateToString() {
        LocalDate date = LocalDate.of(2024, 1, 1);
        FormattedDate expectedFormattedDate = new FormattedDate("2024-01-01");

        assertEquals(expectedFormattedDate, localDateConverter.convertDateToString(date));
    }
}
