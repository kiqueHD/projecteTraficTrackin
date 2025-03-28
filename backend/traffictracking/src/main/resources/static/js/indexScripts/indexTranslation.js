

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
        aeropuerto_barajas: "Aeropuerto Baraja",
        parque_retiro: "Parc Retir",
        cambiar_ubicacion: "Cambiar ubicació",
        add_favs: "Incloure en favorits"
    },

    en: {
        muy_lento: "Very slow",
        lento: "Slow",
        rapido: "Fast",
        muy_rapido: "Very fast",
        ciudades: "Cities: ",
        madrid_centro: "Center Madrid",
        aeropuerto_barajas: "Baraja's Airport",
        parque_retiro: "Retiro's Park",
        cambiar_ubicacion: "Change ubication",
        add_favs: "Add to favourites"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const languageSwitcher = document.getElementById("language-selector");
    let lang = localStorage.getItem("lang") || "es";
    // ERROR indexTranslation.js:47 Uncaught TypeError: Cannot set properties of null (setting 'value')
    //at HTMLDocument.<anonymous> (indexTranslation.js:47:28)
    languageSwitcher.value = lang;
    applyTranslations(lang);

    languageSwitcher.addEventListener("change", (event) => {
        lang = event.target.value;
        localStorage.setItem("lang", lang);
        applyTranslations(lang);
    });
});

function applyTranslations(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        el.innerText = translations[lang][el.getAttribute("data-key")];
    });
}