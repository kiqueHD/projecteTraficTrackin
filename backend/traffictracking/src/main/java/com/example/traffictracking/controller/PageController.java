package com.example.traffictracking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
// Controlador para las rutas de la aplicación
    @GetMapping("/")
    public String home() {
        return "index.html"; 
    }
    @GetMapping("/admin")
    public String admin() {
        return "admin.html"; 
    }
    @GetMapping("/LoginReg")
    public String loginReg() {
        return "LoginReg.html"; 
    }
   
   
}