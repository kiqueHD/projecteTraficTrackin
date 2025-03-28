const API_URL = 'http://localhost:8080/lugares-favoritos';

// Obtener lugares favoritos de un usuario
async function getLugaresFavoritos(userId) {
    const response = await fetch(`${API_URL}/usuario/${userId}`);
    if (!response.ok) throw new Error('No se pudieron obtener los lugares favoritos');
    return response.json();
}
/**constructor de la clase LugaresFavoritos
 *   public LugaresFavoritos(User usuario, String nombre, Double latitud, Double longitud) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
    }
 */
// Agregar un nuevo lugar favorito
async function addLugarFavorito(userId, lugar) {
    const response = await fetch(`${API_URL}/usuario/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lugar)
    });
    if (!response.ok) throw new Error('Error al agregar lugar favorito');
    return response.json();
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
