package com.declspecl.repository;

import com.declspecl.converter.FormattedDate;
import com.declspecl.converter.LocalDateConverter;
import com.declspecl.dependencies.s3.DailyPersonaS3Adapter;
import com.declspecl.model.PersonaName;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DailyPersonaRepositoryTest {
	@Mock
	private DailyPersonaS3Adapter s3Adapter;
	@Mock
	private Supplier<LocalDate> todaySupplier;
	@Mock
	private LocalDateConverter localDateConverter;
	private DailyPersonaRepository dailyPersonaRepository;

	private static final LocalDate TEST_DATE = LocalDate.of(2024, 1, 1);
	private static final FormattedDate TEST_FORMATTED_DATE = new FormattedDate("2024-01-01");
	private static final List<PersonaName> TEST_PERSONA_NAME_POOL = List.of(new PersonaName("Titania"), new PersonaName("Oberon"));

	@BeforeEach
	public void setup() {
		dailyPersonaRepository = new DailyPersonaRepository(s3Adapter, todaySupplier, localDateConverter, TEST_PERSONA_NAME_POOL);
	}

	@Test
	public void getsPersonaForTodayAndCachesResult() throws ExecutionException {
		when(todaySupplier.get()).thenReturn(TEST_DATE);
		when(localDateConverter.convertDateToString(TEST_DATE)).thenReturn(TEST_FORMATTED_DATE);
		when(s3Adapter.fetchPersonaForDay(TEST_FORMATTED_DATE)).thenReturn(Optional.of(new PersonaName("Titania")));

		PersonaName personaForToday1 = dailyPersonaRepository.getPersonaForToday();
		assertEquals(personaForToday1, new PersonaName("Titania"));

		PersonaName personaForToday2 = dailyPersonaRepository.getPersonaForToday();
		assertEquals(personaForToday2, new PersonaName("Titania"));

		PersonaName personaForToday3 = dailyPersonaRepository.getPersonaForToday();
		assertEquals(personaForToday3, new PersonaName("Titania"));

		verify(todaySupplier, times(3)).get();
		verify(localDateConverter, times(3)).convertDateToString(TEST_DATE);
		verify(s3Adapter, times(1)).fetchPersonaForDay(TEST_FORMATTED_DATE);
	}

	@Test
	public void putsRandomPersonasIfNotPresent() throws ExecutionException {
		// do this to put Titania in the cache so that it will predictably not be picked according to random logic
		when(todaySupplier.get()).thenReturn(TEST_DATE);
		when(localDateConverter.convertDateToString(TEST_DATE)).thenReturn(TEST_FORMATTED_DATE);
		when(s3Adapter.fetchPersonaForDay(TEST_FORMATTED_DATE)).thenReturn(Optional.of(new PersonaName("Titania")));

		PersonaName personaForToday = dailyPersonaRepository.getPersonaForToday();
		assertEquals(personaForToday, new PersonaName("Titania"));

		LocalDate yesterday = TEST_DATE.minusDays(1);
		FormattedDate formattedYesterday = new FormattedDate("2023-12-31");

		when(localDateConverter.convertDateToString(yesterday)).thenReturn(formattedYesterday);
		when(s3Adapter.fetchPersonaForDay(formattedYesterday)).thenReturn(Optional.empty());

		PersonaName personaForYesterday = dailyPersonaRepository.getPersonaForDay(yesterday);
		assertEquals(personaForYesterday, new PersonaName("Oberon"));

		verify(s3Adapter, times(1)).putPersonaObjectToS3(formattedYesterday, new PersonaName("Oberon"));
	}
}
