/* Este script se utiliza en la página cpu.html */
"use strict";
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", async (e) => {
            var celda = e.target;
            if (comprobarValido(celda) && !comprobarGanador() && !comprobarEmpate()) {

                if (turnoBloqueado) {
                    return;
                }

                primerJugador(celda.id);
                if (!comprobarGanador() || comprobarEstadoPartida()) {
                    turnoBloqueado = true;
                    await sleep(450);
                    turnoBloqueado = false;
                    segundoJugador(celda.id);
                    comprobarEstadoPartida();
                    comprobarGanador();
                }

                if (comprobarEmpate()) {
                    mostrarEmpate();
                }
                comprobarEstadoPartida();
            }
        })
    });
}

function segundoJugador() {
    var maxNumero = celdas.length - 1;
    var numero = Math.floor(Math.random() * (maxNumero - 0 + 1) + 0);
    var nombreElemento = "celda" + numero;
    var elemento = document.getElementById(nombreElemento);

    if (elemento.value != "O" && elemento.value != "X") {
        elemento.value = "O";
        elemento.setAttribute("disabled", "");
        click++;
    } else if (click <= 3) {
        segundoJugador();
        comprobarEstadoPartida(false);
    } else {
        comprobarGanador();
        comprobarEstadoPartida(true);
    }
}

addEvento(celdas);
