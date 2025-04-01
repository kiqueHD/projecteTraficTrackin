
const API_URL = 'http://localhost:8080/lugares-favoritos';
const params = new URLSearchParams(window.location.search);

// Obtener un parámetro  url (id usuario psado por el backend)
const userId = params.get('userId');


document.getElementById("addFav").addEventListener("submit", async function (e) {
    e.preventDefault();

    // que no sea null o NaN(not a number)
    if (!userId || isNaN(userId)) {
        alert("ID de usuario inválido");
        return;
    }

    const nombreFav = document.getElementById('nombreLugarFav').value;

    if (infoWindowFav == null) {
        alert("Debes seleccionar una ubicación en el mapa");
        return;
    }

    // Objeto Clugar favorito que espera el backend
    const lugarFavorito = {
        nombre: nombreFav,
        latitud: lat,
        longitud: lng
        // El usuario se asocia automáticamente en el backend con el userId
    };

    try {
        const response = await addLugarFavorito(userId, lugarFavorito);
        console.log("Lugar agregado:", response);
        alert("Lugar favorito agregado correctamente");
        //volver a cargar los lugares favoritos    
        cargarLugaresFavoritos(userId, "favoritos");
    } catch (error) {
        console.error("Error:", error);
        alert("Error al agregar lugar favorito");
    }


});

// Función mejorada con manejo de errores
async function addLugarFavorito(userId, lugar) {
    const numericUserId = Number(userId); // Convertir a número

    const response = await fetch(`${API_URL}/usuario/${numericUserId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(lugar)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }

    return response.json();
}













cargarLugaresFavoritos(userId, "favoritos"); // Cargar lugares favoritos al cargar la página
// get de los lugares favoritos
async function cargarLugaresFavoritos(userId, selectId) {
    try {
        const response = await fetch(`${API_URL}/usuario/${userId}`);
        if (!response.ok) throw new Error('No se pudieron obtener los lugares favoritos');

        const lugares = await response.json();
        console.log("Lugares favoritos:", lugares);

        let select = document.getElementById(selectId);

        lugares.forEach(lugar => {
            let opcion = document.createElement("option");
            opcion.value = `${lugar.latitud},${lugar.longitud},13`; //pasar el zoom del usuario en el momento?
            opcion.textContent = lugar.nombre;
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error("Error cargando lugares favoritos:", error);
    }
}


//para el select--------------------------
document.getElementById("favoritos").addEventListener("change", function () {
    let valores = this.value.split(",");
    if (valores.length === 3) {
        let lat = parseFloat(valores[0]);
        let lng = parseFloat(valores[1]);
        let zoom = parseInt(valores[2]);
        cambiarVistaMapa(map, lat, lng, zoom);
    }
});


function cambiarVistaMapa(mapa, latitud, longitud, zoom) {
    let nuevaUbicacion = new google.maps.LatLng(latitud, longitud);
    mapa.setCenter(nuevaUbicacion);
    mapa.setZoom(zoom);
}


// Actualizar un lugar favorito
async function updateLugarFavorito(userId, lugarId, lugar) {
    const response = await fetch(`${API_URL}/usuario/${userId}/${lugarId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lugar)
    });
    if (!response.ok) throw new Error('Error al actualizar lugar favorito');
    return response.json();
}
