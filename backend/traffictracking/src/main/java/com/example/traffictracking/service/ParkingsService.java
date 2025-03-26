package com.example.traffictracking.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ParkingsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode transformarJsonParkings() {
        try {
            // Llamar a la API externa
            String urlApiParkings = "https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/parkings/records?limit=100";
            String jsonParkings = restTemplate.getForObject(urlApiParkings, String.class);

            // Convertir respuesta a JsonNode
            JsonNode nodoRaiz = objectMapper.readTree(jsonParkings);
            ArrayNode resultados = (ArrayNode) nodoRaiz.get("results");
            ArrayNode jsonSimplificado = objectMapper.createArrayNode();

            // Iterar y filtrar los datos
            for (JsonNode nodo : resultados) {
                int plazasLibres = nodo.get("plazaslibr").asInt();
                if (plazasLibres > 0) { // Solo incluir si hay plazas libres
                    ObjectNode record = objectMapper.createObjectNode();
                    record.put("nombre", nodo.get("nombre").asText());
                    record.put("direccion", nodo.get("direccion").asText());
                    record.put("plazasTotales", nodo.get("plazastota").asInt());
                    record.put("plazasLibres", plazasLibres);
                    record.put("fechaModificacion", nodo.get("ultima_mod").asText());

                    // Obtener coordenadas de geo_point_2d
                    JsonNode geoPoint = nodo.get("geo_point_2d");
                    if (geoPoint != null) {
                        record.put("lat", geoPoint.get("lat").asDouble());
                        record.put("lon", geoPoint.get("lon").asDouble());
                    }
                    jsonSimplificado.add(record);
                }
            }

            // Crear objeto final con la clave "results"
            ObjectNode respuestaFinal = objectMapper.createObjectNode();
            respuestaFinal.set("results", jsonSimplificado);

            return respuestaFinal;

        } catch (Exception e) {
            e.printStackTrace();
            return objectMapper.createObjectNode().put("error", "Error procesando los datos");
        }
    }
}

/**
 * 
 * {
 * "results": [
 * {
 * "nombre": "Parking Centro",
 * "direccion": "Calle Mayor, 10",
 * "plazasTotales": 200,
 * "plazasLibres": 50,
 * "fechaModificacion": "2024-03-25T10:00:00Z",
 * "lat": 39.4699,
 * "lon": -0.3763,
 * "color":
 * },
 * {
 * "nombre": "Parking Norte",
 * "direccion": "Avenida Valencia, 5",
 * "plazasTotales": 150,
 * "plazasLibres": 20,
 * "fechaModificacion": "2024-03-25T09:45:00Z",
 * "lat": 39.4800,
 * "lon": -0.3850
 * }
 * ]
 * }
 * 
 * 
 */