//variables globales
let map;
let infoWindowFav = null; // Variable global para almacenar la InfoWindowFAv activa
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 39.4699, lng: -0.3763 } // València
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
   
    createMarcadores();
    windowFav();
}
function windowFav(){
  
    map.addListener("rightclick", (e) => {
        // Obtiene las coordenadas del punto donde se hizo clic derecho
        const latLng = e.latLng;
         lat = latLng.lat();
         lng = latLng.lng();
         // Cierra la InfoWindow actual si existe para evitar múltiples ventanas abiertas
      if (infoWindowFav) {
        infoWindowFav.close();
    }

        // Muestra las coordenadas en una ventana de información
         infoWindowFav = new google.maps.InfoWindow({
            position: latLng,
            content: `<h4>Lugar seleccionado</h4>Latitud: ${lat}<br>Longitud: ${lng}`,
        });
        infoWindowFav.addListener("closeclick", () => {
            console.log("La ventana de información ha sido cerrada.");
        });
        console.log("WINDOWFAV ACTUAL\nLatitud: " + lat + ", Longitud: " + lng);

        infoWindowFav.open(map);
        
        // Agrega un listener para detectar cuando se cierra la InfoWindow
        
    });
    //algo asi ha de ser lugar favorito
    

}

function createMarcadores() {
    /**
 * 
 * {
    "results": [
        {
            "nombre": "Parking Centro",
            "direccion": "Calle Mayor, 10",
            "plazasTotales": 200,
            "plazasLibres": 50,
            "fechaModificacion": "2024-03-25T10:00:00Z",
            "lat": 39.4699,
            "lon": -0.3763
        },
        {
            "nombre": "Parking Norte",
            "direccion": "Avenida Valencia, 5",
            "plazasTotales": 150,
            "plazasLibres": 20,
            "fechaModificacion": "2024-03-25T09:45:00Z",
            "lat": 39.4800,
            "lon": -0.3850
        }
    ]
}

 * 
 */
    // Marcador de parking----------------------------------------------------------------------------
    const apiParkingsUrl = "http://localhost:8080/parkings/disponibles";
    /** explicacion flow de fetch a una api q devuelve un json 
       fetch - Initiates the HTTP request
       response - Contains the server's response
       data - The actual JSON data after parsing
     */
    fetch(apiParkingsUrl)
        .then(response => response.json())
        .then(data => {
            //results es el nombre del array que contiene los results de parkings data.results para acceder
            //para cada result se hace un marcador de parking
            data.results.forEach(parking => {
                let marcadorParking = new google.maps.Marker({
                    position: { lat: parking.lat, lng: parking.lon },
                    map: map,
                    title: parking.nombre,
                    icon: {
                        
                        url: "imagenes/mapIcons/parking_dot.png",
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                let infoParking = new google.maps.InfoWindow({
                    content: `
              <h4>Parking</h4>
              <p>Nombre: ${parking.nombre}<br>
              Direccion: ${parking.direccion}<br>
              Plazas totales: ${parking.plazasTotales}<br>
              Plazas libres: ${parking.plazasLibres}<br>
              Fecha modificación: ${parking.fechaModificacion}<br>
              lon: ${parking.lon}<br>lat: ${parking.lat}</p>
            `
                });

                marcadorParking.addListener("click", () => {
                    infoParking.open(map, marcadorParking);
                });
            });
        })
        .catch(error => console.error('Error al obtener los datos de parkings:', error));
    // FIN Marcador de parking----------------------------------------------------------------------------


    // Marcadores trafico----------------------------------------------------------------------------

    const apiTraffic = "http://localhost:8080/traffic/datos";
    /**
     * COLORES
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
     */
    function getTrafficState(estado) {
        switch (estado) {
            case 0: return "FLUIDO";
            case 1: return "DENSO";
            case 2: return "CONGESTIONADO";
            case 3: return "CORTADO";
            case 4: return "SIN DATOS";
            case 5: return "PASO FLUIDO";
            case 6: return "PASO DENSO";
            case 7: return "PASO CONGESTIONADO";
            case 8: return "PASO CORTADO";
            case 9: return "PASO SIN DATOS";
            default: return "ESTADO DESCONOCIDO";
        }
    }
    function getTrafficIcon(estado) {
        switch (estado) {
            case 0:
            case 5:
                return "imagenes/mapIcons/green-dot4.png";
            case 1:
            case 6:
                return "imagenes/mapIcons/yellow-dot.png";
            case 2:
            case 7:
                return "imagenes/mapIcons/orange-dot.png";
            case 3:
            case 8:
                return "imagenes/mapIcons/red-dot.png";

            default:
                return "imagenes/lane.png"; // default icon
        }
    }
    fetch(apiTraffic)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(trafficResult => {
                let marcadorTraffic = new google.maps.Marker({
                    position: { lat: trafficResult.lat, lng: trafficResult.lon },
                    map: map,
                    title: trafficResult.denominacion,
                    icon: {
                       
                        url: getTrafficIcon(trafficResult.estado), // Cambia el icono según el estado
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                let infoTraffic = new google.maps.InfoWindow({
                    content: `
              <h4>Traffic mark</h4>
              <p>Nombre: ${trafficResult.denominacion}<br>
              Estado: ${getTrafficState(trafficResult.estado)}<br>
              lon: ${trafficResult.lon}<br>lat: ${trafficResult.lat}</p>
            `
                });

                marcadorTraffic.addListener("click", () => {
                    infoTraffic.open(map, marcadorTraffic);
                });
            });
        })
        .catch(error => console.error('Error al obtener los datos de trafico:', error));


    // FIN Marcador trafico----------------------------------------------------------------------------
        //para generar datos de trafico aleatorios 
    function generateTrafficData() {
        const locations = [
            "Paiporta",
            "Benetússer",
            "Torrent",
            "Picanya"
        ];
    
        const results = [];
        
        locations.forEach(location => {
            const count = Math.floor(Math.random() * 11) + 10; // Entre 10 y 20 elementos
            for (let i = 0; i < count; i++) {
                results.push({
                    denominacion: `${location} - Calle ${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                    estado: Math.floor(Math.random() * 10),
                    lon: -0.35 + (Math.random() * 0.1 - 0.05), // Longitudes aproximadas
                    lat: 39.4 + (Math.random() * 0.1 - 0.05)  // Latitudes aproximadas
                });
            }
        });
    
        return { results };
    }
    
    // Ejemplo de uso
    console.log(JSON.stringify(generateTrafficData(), null, 2));

}
initMap();
