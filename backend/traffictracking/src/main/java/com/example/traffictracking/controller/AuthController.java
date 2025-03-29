package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
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
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());
    
        if (user.isPresent() && loginUser.getPassword().equals(user.get().getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("redirect", "/?userId=" + user.get().getId() +"&"+ "User_name=" + user.get().getUser_name()); // Pasar id y user name por URL
            return ResponseEntity.ok(response);
        } 
    
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Usuario o contraseña incorrectos"));
    }

}
