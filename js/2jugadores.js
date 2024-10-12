/* Este script se utiliza en la página 2jugadores.html */
"use strict";
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", (e) => {
            var celda = e.target;
            if (comprobarValido(celda) && !comprobarGanador()) {
                if (click % 2 === 0) {
                    primerJugador(celda.id);
                } else {
                    segundoJugador(celda.id);
                }
                comprobarGanador();
                click++;
            }
        })
    });
}

function segundoJugador(celda) {
    document.getElementById(celda).value = "O";
    document.getElementById(celda).setAttribute("disable", "");
}

addEvento(celdas);
