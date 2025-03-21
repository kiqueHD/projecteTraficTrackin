package com.example.traffictracking.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import com.example.traffictracking.service.TraficoService;

@RestController
@RequestMapping("/trafico")
public class TraficoController {

    private final TraficoService service;

    public TraficoController(TraficoService service) {
        this.service = service;
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Map<String, Object>>> obtenerPorEstado(@PathVariable int estado) {
        return ResponseEntity.ok(service.obtenerTraficoPorEstado(estado));
    }
}
