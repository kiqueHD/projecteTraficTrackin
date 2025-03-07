package com.spring.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

import com.spring.model.User;
import com.spring.repository.UserRepository;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    private final UserRepository usuarioRepository;

    public UserController(UserRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<User> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public User createUsuario(@RequestBody User usuario) {
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
