package com.example.traffictracking.repository;


import com.example.traffictracking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
