package com.declspecl.components;

import com.declspecl.model.EncodedHashedUserSessionId;
import com.declspecl.model.HashedUserSessionId;
import com.google.common.hash.Hashing;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserSessionTransformerTest {
	@Mock
	private Base64.Encoder base64Encoder;
	@Mock
	private Base64.Decoder base64Decoder;
	private UserSessionTransformer userSessionTransformer;

	private static final String TEST_SECRET_KEY = "someSecretKey";
	private static final UUID TEST_USER_SESSION_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");
	private static final HashedUserSessionId TEST_HASHED_USER_SESSION_ID = new HashedUserSessionId("someHashedValue");
	private static final EncodedHashedUserSessionId TEST_ENCODED_HASHED_USER_SESSION_ID = new EncodedHashedUserSessionId("someEncodedHashedValue");

	@BeforeEach
	public void setup() {
		userSessionTransformer = new UserSessionTransformer(base64Encoder, base64Decoder, TEST_SECRET_KEY);
	}

	@Test
	public void decodesEncodedHashedUserSessionId() {
		when(base64Decoder.decode(TEST_ENCODED_HASHED_USER_SESSION_ID.value()))
				.thenReturn(TEST_HASHED_USER_SESSION_ID.value().getBytes(StandardCharsets.UTF_8));

		assertEquals(
				userSessionTransformer.decodeEncodedHashedUserSessionId(TEST_ENCODED_HASHED_USER_SESSION_ID),
				TEST_HASHED_USER_SESSION_ID
		);
	}

	@Test
	public void encodesHashedUserSessionId() {
		when(base64Encoder.encodeToString(TEST_HASHED_USER_SESSION_ID.value().getBytes(StandardCharsets.UTF_8)))
				.thenReturn(TEST_ENCODED_HASHED_USER_SESSION_ID.value());

		assertEquals(
				userSessionTransformer.encodeHashedUserSessionId(TEST_HASHED_USER_SESSION_ID),
				TEST_ENCODED_HASHED_USER_SESSION_ID
		);
	}

	@Test
	public void hashesUserSessionId() {
		HashedUserSessionId expectedHashedUserSessionId = new HashedUserSessionId(
				Hashing.hmacSha256(TEST_SECRET_KEY.getBytes(StandardCharsets.UTF_8))
						.hashString(TEST_USER_SESSION_ID.toString(), StandardCharsets.UTF_8)
						.toString()
		);

		assertEquals(
				userSessionTransformer.hashUserSessionId(TEST_USER_SESSION_ID),
				expectedHashedUserSessionId
		);
	}
}
