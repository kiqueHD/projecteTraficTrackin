package com.example.traffictracking.controller;

import com.example.traffictracking.service.ParkingsService;
import com.example.traffictracking.service.TrafficService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data")
public class TrafficParkingsController {
    private final ParkingsService parkingsService;
    private final TrafficService trafficService;

    public TrafficParkingsController(ParkingsService parkingsService, TrafficService trafficService) {
        this.parkingsService = parkingsService;
        this.trafficService = trafficService;
    }

    @GetMapping("/parkings")
    public JsonNode obtenerParkingsDisponibles() {
        return parkingsService.transformarJsonParkings();
    }

    @GetMapping("/traffic")
    public JsonNode obtenerDatosTrafico() {
        return trafficService.obtenerYTransformarJsonTrafico();
    }
}