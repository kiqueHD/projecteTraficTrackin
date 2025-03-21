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
        // Construimos la URL con el filtro "where"
        /**
         * https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?limit=20&where=estado=1
         */
        
        String url = "https://valencia.opendatasoft.com/api/records/1.0/search/"
                   + "?dataset=estat-transit-temps-real-estado-trafico-tiempo-real"
                   + "&limit=100";
                   //+ "&where=estado=" + estado;
                   
  
        // Realiza la petición
        Map<String, Object> respuesta = restTemplate.getForObject(url, Map.class);

        // Imprime lo que responde la API
        System.out.println("Respuesta API: " + respuesta);

        if (respuesta == null || !respuesta.containsKey("records")) {
            System.out.println("Error: La respuesta es nula o no tiene 'records'");
            return List.of();
        }

        Object records = respuesta.get("records");

        if (!(records instanceof List)) {
            System.out.println(" Error: 'records' no es una lista");
            return List.of();
        }

        List<Map<String, Object>> datos = (List<Map<String, Object>>) records;

        System.out.println("✅ Lugares con estado " + estado + ": " + datos.size());
        return datos;
    }
}
