package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


// ESTE CONTROLLER SE HIZO Y USO AL PRINCIPIO PARA TESTEAR, ES AuthController el que se ocupa de los usuarios
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
        // Verificar si ya existe un usuario con el mismo email
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email");
        }
        return userRepository.save(user);
    }
    // Endpoint para login
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            return user.get();
        }
        throw new RuntimeException("Credenciales inválidas");
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

