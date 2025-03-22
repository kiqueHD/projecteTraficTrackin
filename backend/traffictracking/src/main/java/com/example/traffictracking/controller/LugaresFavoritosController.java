package com.example.traffictracking.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.example.traffictracking.model.LugaresFavoritos;
import com.example.traffictracking.service.LugaresFavoritosService;


@RestController
@RequestMapping("/lugares-favoritos")
public class LugaresFavoritosController {

    private final LugaresFavoritosService service;

    // Inyección de dependencias por constructor
    public LugaresFavoritosController(LugaresFavoritosService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<LugaresFavoritos> agregarLugar(@RequestBody LugaresFavoritos lugar) {
        return ResponseEntity.ok(service.agregarLugar(lugar));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<LugaresFavoritos>> obtenerLugaresPorUsuario(@PathVariable Long userId) {
        return ResponseEntity.ok(service.obtenerLugaresPorUsuario(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLugar(@PathVariable Long id) {
        service.eliminarLugar(id);
        return ResponseEntity.noContent().build();
    }
}
