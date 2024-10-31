package com.declspecl.components;

import com.declspecl.model.HashedUserSessionId;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.function.Supplier;

@Component
public class UserSessionGenerator {
	private final Supplier<UUID> uuidSupplier;
	private final UserSessionTransformer userSessionTransformer;

	public UserSessionGenerator(
		Supplier<UUID> uuidSupplier,
		UserSessionTransformer userSessionTransformer
	) {
		this.uuidSupplier = uuidSupplier;
		this.userSessionTransformer = userSessionTransformer;
	}

	public HashedUserSessionId generateNewHashedUserSessionId() {
		return userSessionTransformer.hashUserSessionId(uuidSupplier.get());
	}
}
