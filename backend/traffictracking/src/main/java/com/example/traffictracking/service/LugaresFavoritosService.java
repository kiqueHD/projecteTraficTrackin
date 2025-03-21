package com.example.traffictracking.service;
import com.example.traffictracking.model.LugaresFavoritos;
import com.example.traffictracking.repository.LugaresFavoritosRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LugaresFavoritosService {

    private final LugaresFavoritosRepository repository;

    // Inyección de dependencias por constructor
    public LugaresFavoritosService(LugaresFavoritosRepository repository) {
        this.repository = repository;
    }

    public LugaresFavoritos agregarLugar(LugaresFavoritos lugar) {
        return repository.save(lugar);
    }

    public List<LugaresFavoritos> obtenerLugaresPorUsuario(Long userId) {
        return repository.findByUsuarioId(userId);
    }

    public void eliminarLugar(Long id) {
        repository.deleteById(id);
    }
}
