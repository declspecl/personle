package com.declspecl.controller.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.immutables.value.Value;

@Value.Immutable
@Value.Style(init = "with*", get = { "is*", "get*" })
@JsonDeserialize(as = ImmutablePostUserGuessRequest.class)
public abstract class PostUserGuessRequest {
	@Value.Parameter
	public abstract String guess();
}
