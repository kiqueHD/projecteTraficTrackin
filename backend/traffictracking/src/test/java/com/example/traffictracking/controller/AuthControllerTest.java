
package com.example.traffictracking.controller;

import com.example.traffictracking.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthControllerTest {

    @Autowired
    private AuthController authController;


    @Test
    public void testRegisterUser() {
        User user = new User("testuser", "test@example.com", "password");
        ResponseEntity<?> response = authController.registerUser(user);
        
        assertTrue(response.getStatusCode().is2xxSuccessful());
    }

}

