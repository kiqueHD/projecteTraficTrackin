package com.example.traffictracking.controller;

import com.example.traffictracking.service.ParkingsService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/parkings")
public class ParkingsController {
    // Inyectamos el servicio
    private final ParkingsService parkingsService;

    public ParkingsController(ParkingsService parkingsService) {
        this.parkingsService = parkingsService;
    }

    @GetMapping("/disponibles")
    public JsonNode obtenerParkingsDisponibles() {
        return parkingsService.transformarJsonParkings();
    }
}
