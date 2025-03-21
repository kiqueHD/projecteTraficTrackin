package com.example.traffictracking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
//creo que se puede devovler sin el .html
    @GetMapping("/")
    public String home() {
        return "MainPrueba.html"; 
    }
    @GetMapping("/admin")
    public String admin() {
        return "admin.html"; 
    }
    @GetMapping("/login")
    public String login() {
        return "login.html"; 
    }
    @GetMapping("/register")
    public String register() {
        return "register.html"; 
    }
    
}
