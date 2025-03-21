package com.example.traffictracking.repository;
import com.example.traffictracking.model.LugaresFavoritos;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface LugaresFavoritosRepository extends JpaRepository<LugaresFavoritos, Long> {
    List<LugaresFavoritos> findByUsuarioId(Long userId);
}
