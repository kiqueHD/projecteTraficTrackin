package com.spring.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.spring.model.*;;

public interface UserRepository extends JpaRepository<User, Long> {
}