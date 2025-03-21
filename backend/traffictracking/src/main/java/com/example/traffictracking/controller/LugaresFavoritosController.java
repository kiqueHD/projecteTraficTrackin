package com.example.traffictracking.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.example.traffictracking.model.LugaresFavoritos;
import com.example.traffictracking.repository.LugaresFavoritosRepository;

@RestController
@RequestMapping("/lugares-favoritos")
public class LugaresFavoritosController {

    private final LugaresFavoritosRepository repository;

    // Inyección de dependencias a través del constructor
    public LugaresFavoritosController(LugaresFavoritosRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<LugaresFavoritos> agregarLugar(@RequestBody LugaresFavoritos lugar) {
        return ResponseEntity.ok(repository.save(lugar));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<LugaresFavoritos>> obtenerLugaresPorUsuario(@PathVariable Long userId) {
        return ResponseEntity.ok(repository.findByUsuarioId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLugar(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
