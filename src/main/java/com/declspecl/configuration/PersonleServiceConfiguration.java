package com.declspecl.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;
import java.time.LocalDate;
import java.util.Base64;
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
}
