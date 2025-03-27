        document.addEventListener("DOMContentLoaded", function() {
            // formulario de registro
            document.getElementById("registerForm").addEventListener("submit", async function (e) {
                e.preventDefault(); // Evitar el envío por defecto

                const userName = document.getElementById('register-username').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                const response = await fetch('/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_name: userName, email, password })
                });

                const result = await response.text();
                if (response.ok) {
                    alert("Registro exitoso. Por favor, inicia sesión.");
                    document.querySelector(".sign-up-btn").click(); // Cambia a la vista de inicio de sesión
                } else {
                    alert(result || "Error al registrarse.");
                }
            });

            //  formulario de login
            document.getElementById("loginForm").addEventListener("submit", async function (e) {
                e.preventDefault(); // Evitar el envío por defecto

                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (response.ok && result.redirect) {
                    window.location.href = result.redirect; // Redirige a la página indicada por el backend
                } else {
                    alert(result.error || "Error al iniciar sesión.");
                }
            });
        });
