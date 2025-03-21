package com.example.traffictracking.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



@Service
public class TraficoService {

    private final RestTemplate restTemplate;

    public TraficoService() {
        this.restTemplate = new RestTemplate();
    }

    public List<Map<String, Object>> obtenerTraficoPorEstado(int estado) {
        String url = "https://valencia.aws-ec2-eu-central-1.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?limit=1000";
        
        Map<String, Object> respuesta = restTemplate.getForObject(url, Map.class);

        // Evitar errores si la respuesta es null o no tiene "results"
        if (respuesta == null || !respuesta.containsKey("results")) {
            return List.of(); // Devuelve una lista vacía si la API falla
        }

        Object results = respuesta.get("results");

        // Verificar que results es una lista antes de hacer el cast
        if (results instanceof List) {
            List<Map<String, Object>> datos = (List<Map<String, Object>>) results;

            // Filtrar los datos donde "estado" sea igual al valor solicitado
            return datos.stream()
                    .filter(item -> item.get("estado") != null && ((Number) item.get("estado")).intValue() == estado)
                    .toList();
        } else {
            return List.of();
        }
    }
}
