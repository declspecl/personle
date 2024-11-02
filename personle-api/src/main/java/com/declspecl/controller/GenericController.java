package com.declspecl.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GenericController implements ErrorController {
	@RequestMapping("/api/**")
	public String handleNotFound() {
		return "redirect:/";
	}
}
