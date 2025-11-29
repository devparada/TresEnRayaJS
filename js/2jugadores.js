/* Este script se utiliza en la página 2jugadores.html */
"use strict";
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
  celdas.forEach((celda) => {
    celda.addEventListener("click", async (e) => {
      let objetivo = e.target;
      if (!comprobarValido(objetivo) || finPartida) return;

      if (click % 2 === 0) {
        primerJugador(objetivo.id);
      } else {
        segundoJugador(objetivo.id);
      }

      await comprobarGanador();

      if (!finPartida && comprobarEmpate()) {
        mostrarEmpate();
        finPartida = true;
        comprobarEstadoPartida();
      }
      click++;
    });
  });
}

function segundoJugador(id) {
  const celda = document.getElementById(id);
  celda.innerText = "O";
  celda.setAttribute("disabled", true);
  contadorMovimientos();
  elemTurnado.innerText = jugador1cadena;
}

addEvento(celdas);
