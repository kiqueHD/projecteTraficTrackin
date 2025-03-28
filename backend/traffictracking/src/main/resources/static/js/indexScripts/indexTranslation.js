const translations = {
    es: {
        muy_lento: "Muy lento",
        lento: "Lento",
        rapido: "Rápido",
        muy_rapido: "Muy rápido",
        ciudades: "Ciudades: ",
        madrid_centro: "Madrid Centro",
        aeropuerto_barajas: "Aeropuerto Baraja",
        parque_retiro: "Parque Retiro",
        cambiar_ubicacion: "Cambiar ubicación",
        add_favs: "Añadir a favoritos"
    },
    val: {
        muy_lento: "Molt llent",
        lento: "Llent",
        rapido: "Ràpid",
        muy_rapido: "Molt ràpid",
        ciudades: "Ciutats: ",
        madrid_centro: "Madrid Centre",
        aeropuerto_barajas: "Aeroport Baraja",
        parque_retiro: "Parc Retir",
        cambiar_ubicacion: "Canviar ubicació",
        add_favs: "Afegir a preferits"
    },
    en: {
        muy_lento: "Very slow",
        lento: "Slow",
        rapido: "Fast",
        muy_rapido: "Very fast",
        ciudades: "Cities: ",
        madrid_centro: "Madrid Center",
        aeropuerto_barajas: "Barajas Airport",
        parque_retiro: "Retiro Park",
        cambiar_ubicacion: "Change location",
        add_favs: "Add to favorites"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    try {
        const languageSwitcher = document.getElementById("language-selector");
        
        if (!languageSwitcher) {
            console.warn("Selector de idioma no encontrado. Las traducciones no estarán disponibles.");
            return;
        }
        
        // Establecer idioma predeterminado
        let lang = localStorage.getItem("lang") || "es";
        
        // Verificar que el idioma almacenado es válido
        if (!translations[lang]) {
            lang = "es";
            localStorage.setItem("lang", lang);
        }
        
        languageSwitcher.value = lang;
        applyTranslations(lang);
        
        languageSwitcher.addEventListener("change", (event) => {
            const newLang = event.target.value;
            if (translations[newLang]) {
                localStorage.setItem("lang", newLang);
                applyTranslations(newLang);
            } else {
                console.error("Idioma no soportado:", newLang);
            }
        });
        
    } catch (error) {
        console.error("Error en el sistema de traducción:", error);
    }
});

function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error("Intento de aplicar traducciones para un idioma no soportado:", lang);
        return;
    }
    
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else {
            console.warn(`Clave de traducción no encontrada para '${key}' en idioma '${lang}'`);
        }
    });
}