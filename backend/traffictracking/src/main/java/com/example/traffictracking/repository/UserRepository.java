package com.example.traffictracking.repository;


import com.example.traffictracking.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User save(User user);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}