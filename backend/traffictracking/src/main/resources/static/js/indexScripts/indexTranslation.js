

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
        add_favs: "Añadir a favoritos",
        crash:"Accidente",
        slowdown:"Congestión",
        road:"Carretera cortada",
        lane:"Carril cortado",
        construction:"Obras",
        vehicle:"Vehículo averiado",
        object:"Obstrucción en la vía",
        trap: "Radar"
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
        add_favs: "Incloure en favorits",
        crash:"Accident",
        slowdown:"Congestió",
        road:"Carretera tallada",
        lane:"Carril tallat",
        construction:"Obres",
        vehicle:"Vehicle avariat",
        object: "Objecte en la via",
        trap: "Radar"
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
        add_favs: "Add to favourites",
        crash:"Crash",
        slowdown:"Slowdown",
        road:"Road closure",
        lane:"Lane closure",
        construction:"Construction",
        vehicle:"Stalled vehicle",
        object:"Object on road",
        trap: "Speed trap"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const languageSwitcher = document.getElementById("language-selector");
    let lang = localStorage.getItem("lang") || "es";
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