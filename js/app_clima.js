// ============================================================
//  app.js — Aplicación del Clima con OpenWeatherMap
//  Construcción de Software III — Semana 04
// ============================================================

// ============================================================
// 1. SELECCIÓN DE ELEMENTOS
// ============================================================
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

// ============================================================
// 2. REGISTRO DE EVENTOS
// ============================================================
window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

// ============================================================
// 3. FUNCIÓN PRINCIPAL: BUSCAR CLIMA
// ============================================================
function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }

  consultarAPI(ciudad, pais);
}

// ============================================================
// 4. MOSTRAR ERROR EN PANTALLA
// ============================================================
function mostrarError(mensaje) {
  const alertaExistente = document.querySelector(".bg-red-100");

  if (!alertaExistente) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
    );

    alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

// ============================================================
// 5. CONSULTAR API DE OPENWEATHER
// ============================================================
function consultarAPI(ciudad, pais) {
  const appId = "883c7851b0a0ad29e3d9c14eb9a762f0";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML();

      if (datos.cod === "404") {
        mostrarError("Ciudad No Encontrada");
      } else {
        mostrarClima(datos);
      }
    })
    .catch((error) => console.log("Error:", error));
}

// ============================================================
// 6. MOSTRAR CLIMA EN EL HTML
// ============================================================
function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const grados = KelvinACentigrados(temp);
  const max = KelvinACentigrados(temp_max);
  const min = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.append(nombreCiudad, actual, tempMaxima, tempMinima);

  resultado.appendChild(resultadoDiv);
}

// ============================================================
// 7. CONVERSIÓN DE KELVIN A CENTÍGRADOS
// ============================================================
function KelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

// ============================================================
// 8. LIMPIAR RESULTADOS ANTERIORES
// ============================================================
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// ============================================================
// 9. SPINNER DE CARGA
// ============================================================
function Spinner() {
  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

  resultado.appendChild(divSpinner);
}
