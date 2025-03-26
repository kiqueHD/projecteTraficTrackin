// Traducciones completas
const translations = {
    es: {
        welcomeTraffick: "Bienvenido a Traffick",
        welcomeBack: "Bienvenido de nuevo",
        loginPrompt: "Si ya tienes una cuenta por favor inicia sesión aqui",
        registerPrompt: "¿Aun no tienes una cuenta?",
        registerPromptAlt: "Si aun no tienes una cuenta por favor regístrese aqui",
        createAccountTitle: "Crear una cuenta",
        loginTitle: "Iniciar Sesión",
        freeAccount: "Crear una cuenta gratis",
        namePlaceholder: "Nombre",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Contraseña",
        loginButton: "Iniciar Sesión",
        registerButton: "Registrarse"
    },
    val: {
        welcomeTraffick: "Benvingut a Traffick",
        welcomeBack: "Benvingut de nou",
        loginPrompt: "Si ja tens un compte, per favor inicia sessió aquí",
        registerPrompt: "Encara no tens un compte?",
        registerPromptAlt: "Si encara no tens un compte per favor registra't aquí",
        createAccountTitle: "Crear un compte",
        loginTitle: "Iniciar Sessió",
        freeAccount: "Crear un compte gratuït",
        namePlaceholder: "Nom",
        emailPlaceholder: "Correu electrònic",
        passwordPlaceholder: "Contrasenya",
        loginButton: "Iniciar Sessió",
        registerButton: "Registrar-se"
    },
    en: {
        welcomeTraffick: "Welcome to Traffick",
        welcomeBack: "Welcome back",
        loginPrompt: "If you already have an account, please login here",
        registerPrompt: "Don't have an account yet?",
        registerPromptAlt: "If you don't have an account yet, please register here",
        createAccountTitle: "Create Account",
        loginTitle: "Login",
        freeAccount: "Create a free account",
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        loginButton: "Login",
        registerButton: "Sign Up"
    }
};

function changeLanguage() {
    const language = document.querySelector('.language-selector').value;
    const t = translations[language];

    // Actualizar textos
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        
        if (element.tagName === 'INPUT') {
            // Para placeholders y valores de botones
            if (element.type === 'button' || element.type === 'submit') {
                element.value = t[key];
            } else {
                element.placeholder = t[key];
            }
        } else {
            // Para otros elementos (h2, p, button, etc.)
            element.textContent = t[key];
        }
    });
}

// Inicializar con el idioma del selector
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage();
});