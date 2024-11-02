package com.declspecl.components;

import com.declspecl.model.HashedUserSessionId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserSessionGeneratorTest {
	@Mock
	private Supplier<UUID> uuidSupplier;
	@Mock
	private UserSessionTransformer userSessionTransformer;
	@InjectMocks
	private UserSessionGenerator userSessionGenerator;

	private static final UUID TEST_UUID = UUID.fromString("00000000-0000-0000-0000-000000000000");
	private static final HashedUserSessionId TEST_HASHED_USER_SESSION_ID = new HashedUserSessionId("someHashedUserSessionId");

	@Test
	public void generatesNewHashedUserSessionId() {
		when(uuidSupplier.get()).thenReturn(TEST_UUID);
		when(userSessionTransformer.hashUserSessionId(TEST_UUID)).thenReturn(TEST_HASHED_USER_SESSION_ID);

		assertEquals(userSessionGenerator.generateNewHashedUserSessionId(), TEST_HASHED_USER_SESSION_ID);
	}
}
