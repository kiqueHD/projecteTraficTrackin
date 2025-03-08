package com.spring.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.spring.model.User;
import com.spring.repository.UserRepository;

/**
 * UserController es un controlador REST que maneja solicitudes HTTP para la gestión de usuarios.
 * Proporciona endpoints para operaciones CRUD sobre usuarios.
 * 
 * Endpoints:
 * - POST /users: Crea un nuevo usuario y lo guarda en la base de datos (Create).
 * - GET /users: Recupera todos los usuarios de la base de datos (Read).
 * - GET /users/{id}: Recupera un usuario por su ID (Read).
 * - PUT /users/{id}: Actualiza un usuario existente por su ID (Update).
 * - DELETE /users/{id}: Elimina un usuario por su ID (Delete).
 * 
 * Dependencias:
 * - UserRepository: Interfaz para la comunicación con la base de datos.
 * 
 * Métodos:
 * - getAllUsers(): Recupera todos los usuarios de la base de datos.
 * - createUser(User user): Crea un nuevo usuario y lo guarda en la base de datos.
 * - getUserById(Long id): Recupera un usuario por su ID.
 * - updateUser(Long id, User userDetails): Actualiza un usuario existente por su ID.
 * - deleteUser(Long id): Elimina un usuario por su ID.
 * 
 * Excepciones:
 * - RuntimeException: Lanzada cuando no se encuentra un usuario por su ID.
 * 
 */
@RestController
@RequestMapping("/api/users")
class UserController {
    private final UserRepository repository;
    //se inyecta la dependencia de userRepository que es la interfaz que se encarga de la comunicación con la base de datos
    public UserController(UserRepository repository) {
        this.repository = repository;
    }
    //aqui por ejemplo se refiere al repositorio y se llama al metodo findAll que es el que se encarga de traer todos los usuarios
    //de la base de datos
    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }
    //aqui se crea un usuario y se guarda en la base de datos CREATE
    @PostMapping
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }
    //aqui se busca un usuario por su id READ
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    //aqui se actualiza un usuario por su id UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        //se busca el usuario por su id y si no se encuentra se lanza una excepción
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        //se actualizan los datos del usuario
        user.setEmail(userDetails.getEmail());
        user.setUserName(userDetails.getUserName());
        user.setPassword(userDetails.getPassword());
        return repository.save(user);
    }  
    //aqui se elimina un usuario por su id DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
