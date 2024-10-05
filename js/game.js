/* Este script se utiliza en las páginas cpu.html y 2jugadores.html */
/* Almacena las constantes, variables y funciones comunes */
// Constantes
const celdas = document.querySelectorAll("td");
const elemResultado = document.getElementById("resultado");

// Variables
var finPartida = false;
var click = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function primerJugador(celda) {
    document.getElementById(celda).value = "X";
    document.getElementById(celda).setAttribute("disable", "");
}

async function colorearResultado(celda0, celda1, celda2, estado) {
    if (!finPartida) {
        // Red
        let color = "#EB6F6F";
        if (estado) {
            // Green
            color = "#29DC27";
        }
        await sleep(150);

        // Para dar el color a la celda de la tabla
        celda0.parentElement.style.backgroundColor = color;
        celda1.parentElement.style.backgroundColor = color;
        celda2.parentElement.style.backgroundColor = color;
        // Para dar el color en el input
        celda0.style.backgroundColor = color;
        celda1.style.backgroundColor = color;
        celda2.style.backgroundColor = color;
    }
}

function mostrarResultado(estado) {
    if (!finPartida) {
        let texto = "Has perdido"
        if (estado) {
            texto = "Has ganado";
        }

        elemResultado.innerText = texto;
        comprobarEstadoPartida(false);
    }
}

function mostrarEmpate() {
    if (!comprobarGanador) {
        elemResultado.innerText = "Empate";
    }
}

function volverJugar() {
    celdas.forEach((celda) => {
        celda.style.backgroundColor = "white";
        celda.children[0].style.backgroundColor = "white";
        celda.children[0].value = "\u00A0\u00A0\u00A0";
    });
    elemResultado.innerText = "Juega otra vez";

    finPartida = false;
    click = 0;
}
