package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Registro de un nuevo usuario
    @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ya existe");
        }
        user.setPassword((user.getPassword()));
        User newUser = userRepository.save(user);
        return ResponseEntity.ok(newUser);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
    }
}


    // Login de un usuario
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        // Buscar al usuario por correo electrónico
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());

        if (user.isPresent()) {
            // Comprobar si la contraseña es correcta (sin encriptación)
            if (loginUser.getPassword().equals(user.get().getPassword())) {
                // Si el login es exitoso, puedes generar un token o simplemente devolver un mensaje
                return ResponseEntity.ok("Login exitoso.");
            } else {
                return ResponseEntity.badRequest().body("Contraseña incorrecta.");
            }
        }

        return ResponseEntity.badRequest().body("Usuario no encontrado.");
    }
}
