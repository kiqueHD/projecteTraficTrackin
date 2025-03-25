package com.example.traffictracking.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ParkingsService {
    //rest template para hacer peticion http a la api parkings de opendatasoft y objectmapper para convertir la respuesta a json
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
                if (plazasLibres > 0) { // Solo incluir si hay plazas libres ni 0 ni negativas
                    ObjectNode record = objectMapper.createObjectNode();
                    record.put("nombre", nodo.get("nombre").asText());
                    record.put("direccion", nodo.get("direccion").asText());
                    record.put("plazasTotales", nodo.get("plazastota").asInt());
                    record.put("plazasLibres", plazasLibres);
                    record.put("fechaModificacion", nodo.get("ultima_mod").asText());
                    
                    //  coordenadas de geo_point_2d
                    JsonNode geoPoint = nodo.get("geo_point_2d");
                    if (geoPoint != null) {
                        record.put("lat", geoPoint.get("lat").asDouble());
                        record.put("lon", geoPoint.get("lon").asDouble());
                    }
                    jsonSimplificado.add(record);
                }
            }
            return jsonSimplificado;

        } catch (Exception e) {
            e.printStackTrace();
            return null; 
        }
    }
}
