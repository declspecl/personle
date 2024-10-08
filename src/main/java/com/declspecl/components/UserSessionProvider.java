package com.declspecl.components;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;
import java.util.function.Supplier;

@Component
public class UserSessionProvider {
	private final Base64.Encoder encoder;
	private final Base64.Decoder decoder;
	private final Supplier<UUID> uuidSupplier;

	public UserSessionProvider(
			Base64.Encoder encoder,
			Base64.Decoder decoder,
			Supplier<UUID> uuidSupplier
	) {
		this.encoder = encoder;
		this.decoder = decoder;
		this.uuidSupplier = uuidSupplier;
	}

	public String generateEncodedSession() {
		return encodeUserSessionId(uuidSupplier.get());
	}

	public String encodeUserSessionId(UUID userSessionId) {
		return encoder.encodeToString(userSessionId.toString().getBytes());
	}

	public UUID decodeSession(String encodedSession) {
		String decodedUserSessionId = Arrays.toString(decoder.decode(encodedSession.getBytes()));

		return UUID.fromString(decodedUserSessionId);
	}
}
