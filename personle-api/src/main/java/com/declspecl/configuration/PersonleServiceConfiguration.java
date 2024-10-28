package com.declspecl.configuration;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;

@Configuration
public class PersonleServiceConfiguration {
	@Bean
	public Supplier<UUID> uuidSupplier() {
		return UUID::randomUUID;
	}

	@Bean
	public Supplier<LocalDate> todaySupplier() {
		return () -> LocalDate.now(Clock.systemUTC());
	}

	@Bean
	public Base64.Encoder base64Encoder() {
		return Base64.getEncoder();
	}

	@Bean
	public Base64.Decoder base64Decoder() {
		return Base64.getDecoder();
	}

	@Bean
	@Qualifier("PersonaNamePool")
	public List<String> personaNamePool() throws IOException {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();

		List<String> personaNames = new ArrayList<>(700);

		try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(classLoader.getResourceAsStream("persona-names.txt")))) {
			while (bufferedReader.ready()) {
				personaNames.add(bufferedReader.readLine());
			}
		}

		return personaNames;
	}
}
