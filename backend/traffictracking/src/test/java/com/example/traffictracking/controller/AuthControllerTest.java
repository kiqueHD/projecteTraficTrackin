
package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import com.example.traffictracking.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthControllerTest {

    @Autowired
    private AuthController authController;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRegisterUser() {
        User user = new User("testuser", "test@example.com", "password");
        ResponseEntity<?> response = authController.registerUser(user);
        
        assertTrue(response.getStatusCode().is2xxSuccessful());
    }

    @Test
    public void testLogin() {
        // First register a user
        User user = new User("loginuser", "login@example.com", "password");
        authController.registerUser(user);

        // Then attempt login
        User loginUser = new User();
        loginUser.setEmail("login@example.com");
        loginUser.setPassword("password");

        ResponseEntity<String> loginResponse = authController.login(loginUser);
        
        assertEquals("Login exitoso.", loginResponse.getBody());
    }
}

