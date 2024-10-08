package com.declspecl.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;
import java.util.function.Supplier;

@Configuration
public class PersonleServiceConfiguration {
	@Bean
	public Supplier<UUID> uuidSupplier() {
		return UUID::randomUUID;
	}
}
