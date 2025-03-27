package com.example.traffictracking.repository;
import com.example.traffictracking.model.LugaresFavoritos;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.traffictracking.model.User;

public interface LugaresFavoritosRepository extends JpaRepository<LugaresFavoritos, Long> {
    // Método para obtener los lugares favoritos de un usuario específico
    List<LugaresFavoritos> findByUsuario(User usuario);
}
