package com.example.traffictracking.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.traffictracking.model.LugaresFavoritos;
import com.example.traffictracking.model.User;

public interface LugaresFavoritosRepository 
extends JpaRepository<LugaresFavoritos, Long> {
    // Método para obtener los lugares favoritos de un usuario específico
    List<LugaresFavoritos> findByUsuario(User usuario);
}
