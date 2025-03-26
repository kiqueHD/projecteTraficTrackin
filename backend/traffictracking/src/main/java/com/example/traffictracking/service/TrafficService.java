package com.example.traffictracking.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TrafficService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode obtenerYTransformarJsonTrafico() {
        try {
            // Llamar a la API externa
            String urlApiTrafico = "https://valencia.aws-ec2-eu-central-1.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?limit=100";
            String jsonTrafico = restTemplate.getForObject(urlApiTrafico, String.class);

            // Convertir respuesta a JsonNode
            JsonNode nodoRaiz = objectMapper.readTree(jsonTrafico);
            ArrayNode resultados = (ArrayNode) nodoRaiz.get("results");
            ArrayNode jsonSimplificado = objectMapper.createArrayNode();

            // Iterar y filtrar los datos
            for (JsonNode nodo : resultados) {
                ObjectNode record = objectMapper.createObjectNode();
                record.put("denominacion", nodo.get("denominacion").asText());
                record.put("estado", nodo.get("estado").asInt());

                // Obtener coordenadas de geo_point_2d o geo_shape.geometry.coordinates
                JsonNode geoPoint = nodo.get("geo_point_2d");
                if (geoPoint != null) {
                    record.put("lat", geoPoint.get("lat").asDouble());
                    record.put("lon", geoPoint.get("lon").asDouble());
                } else {
                    JsonNode geoShape = nodo.get("geo_shape");
                    if (geoShape != null && geoShape.has("geometry") && geoShape.get("geometry").has("coordinates")) {
                        JsonNode coordinates = geoShape.get("geometry").get("coordinates");
                        if (coordinates.isArray() && coordinates.size() > 0) {
                            JsonNode firstPoint = coordinates.get(0);
                            if (firstPoint.isArray() && firstPoint.size() >= 2) {
                                record.put("lon", firstPoint.get(0).asDouble());
                                record.put("lat", firstPoint.get(1).asDouble());
                            }
                        }
                    }
                }

                jsonSimplificado.add(record);
            }

            // Crear la estructura final con un campo "results"
            ObjectNode resultadoFinal = objectMapper.createObjectNode();
            resultadoFinal.set("results", jsonSimplificado);

            return resultadoFinal;

        } catch (Exception e) {
            e.printStackTrace();
            return null; // Manejo de errores básico
        }
    }
}
/**
 * 
 *  COLORES
                * --0 FLUIDO,
                * 1 DENSO,                  // Amarillo
                * 2 CONGESTIONADO,          // NARANJA
                * 3 CORTADO,                // Rojo
                * --4 SIN_DATOS,
                * --5 PASO_FLUIDO,
                * 6 PASO_DENSO:,            // Amarillo
                * 7 PASO_CONGESTIONADO,     // narnaja
                * 8 PASO_CORTADO,           // Rojo
                * --9 PASO_SIN_DATOS
 * 
 */

/**
 * 
 * 1-6 amarillo
 * 2-7 naranja
 * 3-8 rojo
 */
/**
 *  
  {
    "results": [
        {
            "denominacion": "CONSTITUCIÓN (DE HERMANOS MACHADO A TAVERNES BLANQUES)",
            "estado": 0,
            "lat": 39.499551709139574,
            "lon": -0.3700778715218118
        },
        {
            "denominacion": "abastos",
            "estado": 0,
            "lat": 39.1234,
            "lon": -3.0987
        }
    ]
  }


 */