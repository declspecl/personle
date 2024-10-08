package com.declspecl.controller.requests;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@Value.Style(init = "with*", get = { "is*", "get*" })
@JsonSerialize(as = ImmutablePostUserDailyGuessRequest.class)
public abstract class PostUserDailyGuessRequest {
	@Value.Parameter
	public abstract String guess();
}
