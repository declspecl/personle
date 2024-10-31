package com.declspecl.components;

import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Component
public class UserSessionTransformer {
	private final String hashingSecretKey;
	private final Base64.Encoder base64Encoder;
	private final Base64.Decoder base64Decoder;

	public UserSessionTransformer(
			Base64.Encoder base64Encoder,
			Base64.Decoder base64Decoder,
			@Value("${hashing.secret_key}") String hashingSecretKey
	) {
		this.base64Encoder = base64Encoder;
		this.base64Decoder = base64Decoder;
		this.hashingSecretKey = hashingSecretKey;
	}

	public HashedUserSessionId decodeEncodedHashedUserSessionId(EncodedHashedUserSessionId encodedHashedUserSessionId) {
		return new HashedUserSessionId(
				new String(base64Decoder.decode(encodedHashedUserSessionId.value()), StandardCharsets.UTF_8)
		);
	}

	public EncodedHashedUserSessionId encodeHashedUserSessionId(HashedUserSessionId hashedUserSessionId) {
		return new EncodedHashedUserSessionId(
				base64Encoder.encodeToString(hashedUserSessionId.value()
						.getBytes(StandardCharsets.UTF_8))
		);
	}

	public HashedUserSessionId hashUserSessionId(UUID userSessionId) {
		return new HashedUserSessionId(
				Hashing.hmacSha256(hashingSecretKey.getBytes())
						.hashString(userSessionId.toString(), StandardCharsets.UTF_8)
						.toString()
		);
	}
}
