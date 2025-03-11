package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080") // Permitir peticiones desde el frontend
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Obtener todos los usuarios
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Agregar un nuevo usuario
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Eliminar usuario por ID
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return "Usuario eliminado";
        }
        return "Usuario no encontrado";
    }
    
}

