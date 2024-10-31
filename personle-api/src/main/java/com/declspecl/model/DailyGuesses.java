package com.declspecl.model;

import org.immutables.value.Value;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Value.Immutable
@Value.Style(init = "with*", get = { "is*", "get*" })
public abstract class DailyGuesses {
	public abstract HashedUserSessionId hashedUserSessionId();
	public abstract LocalDate date();
	public abstract List<String> guesses();
}
