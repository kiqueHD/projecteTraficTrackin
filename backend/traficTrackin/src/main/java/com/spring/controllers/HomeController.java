package com.spring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "redirect:/main.html";  // Redirige a main.html en frontend/pages
    }

    @GetMapping("/register")
    public String register() {
        return "redirect:/register.html";  // Redirige a register.html en frontend/pages
    }
}