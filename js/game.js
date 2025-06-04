/* Este script se utiliza en las páginas cpu.html y 2jugadores.html */
/* Almacena las constantes, variables y funciones comunes */
"use strict";

// Constantes
const elemResultado = document.querySelector("#resultado");
const fondoCeldas = "rgb(51 65 85 / 0.4)";
// \u00A0 -> es &nbsp; (un espacio)
const espaciosValor = "\u00A0\u00A0\u00A0";

// Variables
var click = 0;
var finPartida = false;
var turnoBloqueado = false;
var celdas = document.querySelectorAll(".celdas");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function primerJugador(celda) {
    document.getElementById(celda).innerText = "X";
    document.getElementById(celda).setAttribute("disabled", "");
}

async function colorearResultado(celda0, celda1, celda2, estado) {
    // Red
    let color = "#EB6F6F";
    if (estado) {
        // Green
        color = "#29DC27";
    }
    let textColor = "black";
    await sleep(150);

    // Para dar el color en el botón
    celda0.style.backgroundColor = color;
    celda1.style.backgroundColor = color;
    celda2.style.backgroundColor = color;
    // Para dar el color en el texto del botón
    celda0.style.color = textColor;
    celda1.style.color = textColor;
    celda2.style.color = textColor;
}

function mostrarResultado(estado) {
    let texto = "Has perdido"
    if (estado) {
        texto = "Has ganado";
    }

    elemResultado.innerText = texto;
    comprobarEstadoPartida();
}

function mostrarEmpate() {
    let texto = "Empate"
    elemResultado.innerText = texto;
}

function limpiarTablero() {
    celdas.forEach((celda) => {
        celda.style.backgroundColor = "";
        celda.style.color = "";
        celda.innerText = espaciosValor;
        celda.removeAttribute("disabled");
    });
    celdas = document.querySelectorAll(".celdas");
}

function volverJugar() {
    limpiarTablero();
    elemResultado.innerText = "Juega";

    click = 0;
    finPartida = false;
}

function comprobarValido(celda) {
    if (celda.innerText == espaciosValor) {
        return true;
    }
    return false;
}

function comprobarEstadoPartida() {
    if (finPartida) {
        celdas.forEach((celda) => {
            celda.setAttribute("disabled", "");
        });
    }
}

function comprobarGanador() {
    var combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let primerNumero = celdas[combinacionesGanadoras[i][0]];
        let segundoNumero = celdas[combinacionesGanadoras[i][1]];
        let tercerNumero = celdas[combinacionesGanadoras[i][2]];

        if (primerNumero.innerText == "X" && segundoNumero.innerText == "X" && tercerNumero.innerText == "X") {
            finPartida = true;
            colorearResultado(primerNumero, segundoNumero, tercerNumero, true);
            mostrarResultado(true);
        } else if (primerNumero.innerText == "O" && segundoNumero.innerText == "O" && tercerNumero.innerText == "O") {
            finPartida = true;
            colorearResultado(primerNumero, segundoNumero, tercerNumero, false);
            mostrarResultado(false);
        }
    }

    return finPartida;
}

function comprobarEmpate() {
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i].innerText == espaciosValor) {
            return false;
        }
    }
    return true;
}
