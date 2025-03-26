let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 39.4699, lng: -0.3763 } // València
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
   createMarcadores();
}
function createMarcadores(){
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