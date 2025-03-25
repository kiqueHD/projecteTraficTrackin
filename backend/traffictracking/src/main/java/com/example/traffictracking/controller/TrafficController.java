package com.example.traffictracking.controller;

import com.example.traffictracking.service.TrafficService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/traficoTiempoReal")
public class TrafficController {

    private final TrafficService trafficService;

    public TrafficController(TrafficService trafficService) {
        this.trafficService = trafficService;
    }

    @GetMapping
    public JsonNode obtenerDatosTrafico() {
        return trafficService.obtenerYTransformarJson();
    }
}
