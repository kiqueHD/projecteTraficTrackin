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
                <td>${user.user_name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td><button class="delete" onclick="deleteUser(${user.id})">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        alert("Hubo un problema al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.");
    }
}

document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name: nombre, email, password })
        });

        if (!response.ok) {
            alert("Error al agregar usuario");
            throw new Error("Error al agregar usuario");
        }

        loadUsers();
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        alert("Hubo un problema al agregar el usuario. Por favor, inténtelo de nuevo más tarde.");
    }
});

async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar usuario");
        loadUsers();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Hubo un problema al eliminar el usuario. Por favor, inténtelo de nuevo más tarde.");
    }
}

loadUsers();
