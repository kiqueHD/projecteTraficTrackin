
const API_URL = 'http://localhost:8080/lugares-favoritos';
const params = new URLSearchParams(window.location.search);

// Obtener un parámetro  url
const nombreUsu = params.get('User_name');
const userId = params.get('userId');
console.log("nombre: ", nombreUsu);
console.log("id: ", userId);


document.getElementById("addFav").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validar que existan los datos necesarios
    if (!userId || isNaN(userId)) {
        alert("ID de usuario inválido");
        return;
    }

    const nombreFav = document.getElementById('nombreLugarFav').value;

    if (infoWindowFav==null) {
        alert("Debes seleccionar una ubicación en el mapa");
        return;
    }

    // Objeto CORRECTO que espera el backend
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
        // Opcional: recargar la lista de lugares
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











// Obtener lugares favoritos de un usuario
async function getLugaresFavoritos(userId) {
    const response = await fetch(`${API_URL}/usuario/${userId}`);
    if (!response.ok) throw new Error('No se pudieron obtener los lugares favoritos');
    return response.json();
    console.log("Lugares favoritos: ", response.json());
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
