// Menús desplegables - Aside
const menu = document.getElementsByClassName('collapsible-panel')[0];
const enlace = document.getElementsByClassName('enlaceRef')[0];
const cont = document.getElementById('collapsible-content-leyenda');

menu.addEventListener("click", menuDesplegable);

function menuDesplegable() {
    if (enlace.ariaExpanded == "false") {
        cont.style.display = "flex";
        cont.ariaHidden = false;
        cont.className = "collapsible-panel_content";
        enlace.ariaExpanded = true;
    } else {
        cont.style.display = "none";
        cont.ariaHidden = true;
        cont.className = "collapsible-panel_content is-collapse";
        enlace.ariaExpanded = false;
    }
}

// Integración del mapa
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 39.4699, lng: -0.3763 } // València
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    createMarcadores();


    map.addListener("rightclick", (e) => {
        // Obtiene las coordenadas del punto donde se hizo clic derecho
        const latLng = e.latLng;
        const lat = latLng.lat();
        const lng = latLng.lng();

        // Muestra las coordenadas en la consola
        console.log(`Coordenadas del clic derecho: Latitud: ${lat}, Longitud: ${lng}`);

        // Opcional: Muestra las coordenadas en una ventana de información
        const infoWindow = new google.maps.InfoWindow({
            position: latLng,
            content: `Latitud: ${lat}<br>Longitud: ${lng}`,
        });
        infoWindow.open(map);
    });
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