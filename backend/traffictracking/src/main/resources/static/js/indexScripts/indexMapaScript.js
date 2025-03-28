let map;
let infoWindowFav = null; // Variable global para almacenar la InfoWindowFAv activa
lugarFavorito = null; // Variable para almacenar el lugarFavorito favorito

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 39.4699, lng: -0.3763 } // València
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    createMarcadores();
    windowFav();

   
function windowFav(){
  
    map.addListener("rightclick", (e) => {
        // Obtiene las coordenadas del punto donde se hizo clic derecho
        const latLng = e.latLng;
        const lat = latLng.lat();
        const lng = latLng.lng();
         // Cierra la InfoWindow actual si existe
      if (infoWindowFav) {
        infoWindowFav.close();
        lugarFavorito = null; // Reinicia el lugarFavorito favorito
    }

        // Muestra las coordenadas en una ventana de información
         infoWindowFav = new google.maps.InfoWindow({
            position: latLng,
            content: `Latitud: ${lat}<br>Longitud: ${lng}`,
        });
        console.log("WINDOWFAV ACTUAL\nLatitud: " + lat + ", Longitud: " + lng);

        infoWindowFav.open(map);
    });
}

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
    let marcadorParking = new google.maps.Marker({
        position: { lat: 39.4720, lng: -0.3730 },
        map: map,
        title: "Parking",
        icon: {
            url: "imagenes/mapIcons/parking_dot.png",
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    let infoParking = new google.maps.InfoWindow({
        content: "<h4>Parking</h4><p>Nombre: Abastos<br>Direccion: AvenidaJAJAJ 65<br>Plazas totales: 332 <br>Plazas libres: 2<br> Fecha modificación: 1234897/2025 <br> lon:34 <br> lat:22</p>"
    });

    marcadorParking.addListener("click", () => {
        infoParking.open(map, marcadorParking);
    });
    const apiUrl = "http://localhost:8080/parkings/disponibles";
    /** explicacion flow de fetch a una api q devuelve un json 
       fetch - Initiates the HTTP request
       response - Contains the server's response
       data - The actual JSON data after parsing
     */
    fetch(apiUrl)
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




    // FIN Marcador trafico----------------------------------------------------------------------------

    //----------------------------amarillo----------------------------------------------------------------
    let marcadorG = new google.maps.Marker({
        position: { lat: 39.4702, lng: -0.3768 },
        map: map,
        title: "Marker",
        icon: {
            url: "imagenes/mapIcons/yellow-dot.png", // Ruta local al marcador
            scaledSize: new google.maps.Size(30, 30) // Puedes ajustar el tamaño
        }
    });

    //------------------------------rojo---------------------------------------------------
    let marcadorRoig = new google.maps.Marker({
        position: { lat: 39.4720, lng: -0.3740 },
        map: map,
        title: "Marker",
        icon: {
            url: "imagenes/mapIcons/red-dot.png",
            scaledSize: new google.maps.Size(30, 30)
        }
    });
    //-------------------------------narnaja--------------------------------------------------
    let marcadorTaronja = new google.maps.Marker({
        position: { lat: 39.4740, lng: -0.3720 },
        map: map,
        title: "Marcador Taronja",
        icon: {
            url: "imagenes/mapIcons/orange-dot.png",
            scaledSize: new google.maps.Size(30, 30)
        }
    });

}
initMap();
