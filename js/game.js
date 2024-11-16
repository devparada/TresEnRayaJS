/* Este script se utiliza en las páginas cpu.html y 2jugadores.html */
/* Almacena las constantes, variables y funciones comunes */
"use strict";
// Constantes
const celdas = document.querySelectorAll("td");
const elemResultado = document.querySelector("#resultado");

// Variables
var finPartida = false;
var click = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function primerJugador(celda) {
    document.getElementById(celda).value = "X";
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

    // Para dar el color a la celda de la tabla
    celda0.parentElement.style.backgroundColor = color;
    celda1.parentElement.style.backgroundColor = color;
    celda2.parentElement.style.backgroundColor = color;
    // Para dar el color en el input
    celda0.style.backgroundColor = color;
    celda1.style.backgroundColor = color;
    celda2.style.backgroundColor = color;
    // Para dar el color en el texto del input
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
}

function volverJugar() {
    celdas.forEach((celda) => {
        celda.style.backgroundColor = "white";
        celda.children[0].style.backgroundColor = "#0a1e30";
        celda.children[0].style.color = "white";
        celda.children[0].value = "\u00A0\u00A0\u00A0";
    });
    elemResultado.innerText = "Juega otra vez";

    finPartida = false;
    click = 0;
}

function comprobarValido(celda) {
    // \u00A0 -> es &nbsp; (un espacio)
    if (document.getElementById(celda.id).getAttribute("value") == "\u00A0\u00A0\u00A0") {
        return true;
    }
    return false;
}

function comprobarEstadoPartida() {
    var comprobarEmpate = true;
    celdas.forEach((celda) => {
        let valorCelda = celda.children[0]?.value;

        if (!valorCelda || valorCelda.trim() === "") {
            comprobarEmpate = false;
        }
    });

    if (comprobarEmpate && !comprobarGanador()) {
        elemResultado.innerText = "Empate";
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
        let primerNumero = celdas[combinacionesGanadoras[i][0]].children[0];
        let segundoNumero = celdas[combinacionesGanadoras[i][1]].children[0];
        let tercerNumero = celdas[combinacionesGanadoras[i][2]].children[0];

        if (primerNumero.value == "X" && segundoNumero.value == "X" && tercerNumero.value == "X") {
            finPartida = true;
            colorearResultado(primerNumero, segundoNumero, tercerNumero, true);
            mostrarResultado(true);
        } else if (primerNumero.value == "O" && segundoNumero.value == "O" && tercerNumero.value == "O") {
            finPartida = true;
            colorearResultado(primerNumero, segundoNumero, tercerNumero, false);
            mostrarResultado(false);
        }
    }

    return finPartida;
}
