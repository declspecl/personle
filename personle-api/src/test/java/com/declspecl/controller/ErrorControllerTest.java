package com.declspecl.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ErrorControllerTest {
	private ErrorController errorController;

	@BeforeEach
	public void setup() {
		errorController = new ErrorController();
	}

	@Test
	public void handlesNotFound() {
		assertEquals(errorController.handleNotFound(), "redirect:/");
	}
}
