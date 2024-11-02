package com.declspecl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {
	@RequestMapping("/api/**")
	public String handleNotFound() {
		return "redirect:/";
	}
}
