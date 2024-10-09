package com.declspecl.components;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Component
public class UserSessionTransformer {
	private final Base64.Encoder encoder;
	private final Base64.Decoder decoder;

	public UserSessionTransformer(
			Base64.Encoder encoder,
			Base64.Decoder decoder
	) {
		this.encoder = encoder;
		this.decoder = decoder;
	}

	public String encodeSession(UUID userSessionId) {
		return encoder.encodeToString(userSessionId.toString().getBytes());
	}

	public UUID decodeSession(String encodedSession) {
		String decodedUserSessionId = new String(decoder.decode(encodedSession.getBytes()), StandardCharsets.ISO_8859_1);

		return UUID.fromString(decodedUserSessionId);
	}
}
