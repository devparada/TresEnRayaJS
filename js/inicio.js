/* Este script se utiliza en la página inicio.html */
"use strict";
// Constantes
const botonCPU = document.querySelector("#boton-cpu");
const boton2Jugadores = document.querySelector("#boton-2jugadores");

botonCPU.addEventListener("click", function () {
    globalThis.location.href = "pages/cpu.html";
});

boton2Jugadores.addEventListener("click", function () {
    globalThis.location.href = "pages/2jugadores.html";
});
