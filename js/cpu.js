/* Este script se utiliza en la página cpu.html */
"use strict";
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
  celdas.forEach((celda) => {
    celda.addEventListener("click", async (e) => {
      var objetivo = e.target;
      if (comprobarValido(objetivo) && !comprobarGanador() && !comprobarEmpate()) {
        if (turnoBloqueado) {
          return;
        }

        contarMovimientos();
        primerJugador(objetivo.id);
        if (!comprobarGanador() || comprobarEstadoPartida()) {
          turnoBloqueado = true;
          await sleep(650);
          turnoBloqueado = false;
          segundoJugador();
          comprobarEstadoPartida();
          comprobarGanador();
        }

        if (comprobarEmpate()) {
          mostrarEmpate();
        }
        contarMovimientos();
        comprobarEstadoPartida();
      }
    });
  });
}

function contarMovimientos() {
  movimientos++;
  document.querySelector("#movimientos").innerText = movimientos;
}

function segundoJugador() {
  var maxNumero = celdas.length - 1;
  var numero = Math.floor(Math.random() * (maxNumero - 0 + 1) + 0);
  var nombreElemento = "celda" + numero;
  var elemento = document.getElementById(nombreElemento);

  if (elemento.innerText != "O" && elemento.innerText != "X") {
    elemento.innerText = "O";
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
