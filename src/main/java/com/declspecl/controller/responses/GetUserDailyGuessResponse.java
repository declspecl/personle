package com.declspecl.controller.responses;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.Collections;
import java.util.List;

@Value.Immutable
@Value.Style(init = "with*", get = { "is*", "get*" })
@JsonSerialize(as = ImmutableGetUserDailyGuessResponse.class)
public abstract class GetUserDailyGuessResponse {
	@Value.Parameter
	public abstract List<String> guesses();

	public static final ImmutableGetUserDailyGuessResponse EMPTY = ImmutableGetUserDailyGuessResponse.of(Collections.emptyList());
}
