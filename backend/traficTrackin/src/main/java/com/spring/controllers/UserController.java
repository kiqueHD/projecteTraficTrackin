package com.spring.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.spring.model.User;
import com.spring.repository.UserRepository;

@RestController
@RequestMapping("/users")
class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setEmail(userDetails.getEmail());
        user.setUserName(userDetails.getUserName());
        user.setPassword(userDetails.getPassword());
        return repository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
