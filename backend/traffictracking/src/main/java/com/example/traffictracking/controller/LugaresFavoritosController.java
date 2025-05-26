package com.example.traffictracking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.traffictracking.model.LugaresFavoritos;
import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.LugaresFavoritosRepository;
import com.example.traffictracking.repository.UserRepository;

@RestController
@RequestMapping("/lugares-favoritos")
public class LugaresFavoritosController {
    
    private final LugaresFavoritosRepository repository;
    private final UserRepository userRepository;

    public LugaresFavoritosController(LugaresFavoritosRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    
    // Obtener todos los lugares favoritos de un usuario por su id
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<LugaresFavoritos>> 
    getLugaresFavoritosByUserId(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<LugaresFavoritos> lugares = repository.findByUsuario(user.get());
            return ResponseEntity.ok(lugares);
        }
        return ResponseEntity.notFound().build(); // 404 si el usuario no existe
    }

    // Crear un nuevo lugar favorito para un usuario por su id
    @PostMapping("/usuario/{userId}")
    public ResponseEntity<LugaresFavoritos> createLugaresFavoritos(@PathVariable Long userId, @RequestBody LugaresFavoritos lugar) {
        return userRepository.findById(userId).map(user -> {
            lugar.setUsuario(user); // Asigna el usuario al lugar favorito
            return ResponseEntity.ok(repository.save(lugar)); // Guarda el nuevo lugar favorito
        }).orElseGet(() -> ResponseEntity.notFound().build()); // 404 si el usuario no existe
    }

    // Actualizar un lugar favorito de un usuario por su id
    @PutMapping("/usuario/{userId}/{id}")
    public ResponseEntity<LugaresFavoritos> updateLugaresFavoritos(@PathVariable Long userId, @PathVariable Long id, @RequestBody LugaresFavoritos lugarDetails) {
        return repository.findById(id).filter(lugar -> lugar.getUsuario().getId().equals(userId)).map(lugar -> {
            lugar.setNombre(lugarDetails.getNombre()); // Actualiza el nombre
            lugar.setLatitud(lugarDetails.getLatitud()); // Actualiza la latitud
            lugar.setLongitud(lugarDetails.getLongitud()); // Actualiza la longitud
            repository.save(lugar); // Guarda los cambios
            return ResponseEntity.ok(lugar);
        }).orElseGet(() -> ResponseEntity.notFound().build()); // 404 si el lugar no pertenece al usuario
    }

    // Eliminar un lugar favorito de un usuario por su id
    @DeleteMapping("/usuario/{userId}/{id}")
    public ResponseEntity<Void> deleteLugaresFavoritos(@PathVariable Long userId, @PathVariable Long id) {
        Optional<LugaresFavoritos> optionalLugar = repository.findById(id);
    
        if (optionalLugar.isPresent()) {
            LugaresFavoritos lugar = optionalLugar.get();
            if (lugar.getUsuario() != null && lugar.getUsuario().getId().equals(userId)) {
                repository.delete(lugar);
                return ResponseEntity.noContent().build(); // 204 si se elimina correctamente
            } else {
                return ResponseEntity.status(403).build(); // 403 si el usuario no tiene permiso
            }
        }
        return ResponseEntity.notFound().build(); // 404 si el lugar no existe
    }
    
}