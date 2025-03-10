const API_URL = "http://localhost:8080/users";

async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al cargar usuarios");
        const users = await response.json();

        const tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td><button class="delete" onclick="deleteUser(${user.id})">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    console.log("Nombre:", nombre); // Verificar el valor de nombre
    console.log("Email:", email);   // Verificar el valor de email

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: nombre, email })
        });
        
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
                if (!response.ok) { alert("Error al agregar usuario"); throw new Error("Error al agregar usuario"); }
        loadUsers();
    } catch (error) {
        console.error("Error:", error);
    }
});
async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar usuario");
        loadUsers();
    } catch (error) {
        console.error("Error:", error);
    }
}

loadUsers();