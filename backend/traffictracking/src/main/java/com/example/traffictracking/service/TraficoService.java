package com.example.traffictracking.service;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class TraficoService {

    private final RestTemplate restTemplate;

    public TraficoService() {
        this.restTemplate = new RestTemplate();
    }

    public List<Map<String, Object>> obtenerTraficoPorEstado(int estado) {
        String url = "https://valencia.aws-ec2-eu-central-1.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?limit=100";
        
        // Realiza la petición
        Map<String, Object> respuesta = restTemplate.getForObject(url, java.util.LinkedHashMap.class);
        
        // Imprime lo que responde la API
        System.out.println("Respuesta API: " + respuesta);

        if (respuesta == null || !respuesta.containsKey("results")) {
            System.out.println("❌ Error: La respuesta es nula o no tiene 'results'");
            return List.of();
        }

        Object results = respuesta.get("results");

        if (!(results instanceof List)) {
            System.out.println("❌ Error: 'results' no es una lista");
            return List.of();
        }

        List<Map<String, Object>> datos = (List<Map<String, Object>>) results;

        // Filtrar por estado y depurar
        List<Map<String, Object>> filtrados = datos.stream()
                .filter(item -> {
                    System.out.println("Revisando: " + item);
                    return item.get("estado") instanceof Number &&
                           ((Number) item.get("estado")).intValue() == estado;
                })
                .toList();

        System.out.println("✅ Lugares con estado " + estado + ": " + filtrados.size());
        return filtrados;
    }
}
