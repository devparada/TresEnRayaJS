/* Este script se utiliza en la página cpu.html */
"use strict";
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
  celdas.forEach((celda) => {
    celda.addEventListener("click", async (e) => {
      var objetivo = e.target;
      if (comprobarValido(objetivo) && !comprobarEmpate()) {
        if (turnoBloqueado) {
          return;
        }

        primerJugador(objetivo.id);
        if (comprobarGanador() || comprobarEstadoPartida()) {
          turnoBloqueado = true;
          await sleep(450);
          turnoBloqueado = false;
          segundoJugador();
          comprobarEstadoPartida();
          comprobarGanador();
        }

        if (comprobarEmpate()) {
          mostrarEmpate();
        }
        comprobarEstadoPartida();
      }
    });
  });
}

function segundoJugador() {
  if (finPartida) return;

  const inteligente = Math.random() < 0.5;

  if (inteligente) {
    // Intenta ganar
    let celdaParaGanar = encontrarMovimiento("O");
    if (celdaParaGanar) {
      realizarMovimiento(celdaParaGanar);
      return;
    }

    // Bloquea al jugador
    let celdaParaBloquear = encontrarMovimiento("X");
    if (celdaParaBloquear) {
      realizarMovimiento(celdaParaBloquear);
      return;
    }

    // Movimiento aleatorio
    movimientoRandom();
  } else {
    movimientoRandom();
  }
}

/**
 * 
 * Encuentra un movimiento ganador o bloqueador para el símbolo pasado como parámetro
 * @param {*} simbolo El simbolo a buscar ("X" o "O")
 * @returns 
 */
function encontrarMovimiento(simbolo) {
  const combinaciones = [
    ["celda0", "celda1", "celda2"],
    ["celda3", "celda4", "celda5"],
    ["celda6", "celda7", "celda8"],
    ["celda0", "celda3", "celda6"],
    ["celda1", "celda4", "celda7"],
    ["celda2", "celda5", "celda8"],
    ["celda0", "celda4", "celda8"],
    ["celda2", "celda4", "celda6"],
  ];

  for (let combinacion of combinaciones) {
    const valores = combinacion.map((id) => document.getElementById(id).innerText);

    // Si hay 2 celdas con letras y 1 vacío: oportunidad de ganar o bloquear
    if (
      valores.filter((v) => v === simbolo).length === 2 &&
      valores.includes(VACIO)
    ) {
      const indice = valores.indexOf(VACIO);
      return document.getElementById(combinacion[indice]);
    }
  }

  return null;
}

/**
 * 
 * Realiza el movimiento en la celda pasada como parámetro
 * @param {*} celda La celda donde se realiza el movimiento
 */
function realizarMovimiento(celda) {
  celda.innerText = "O";
  celda.setAttribute("disabled", "");
  click++;
  contadorMovimientos();
  comprobarGanador();
  comprobarEstadoPartida();
}

/**
 * 
 * Hace un movimiento aleatorio en una celda libre
 * @returns 
 */
function movimientoRandom() {
  let celdasLibres = Array.from(celdas).filter((c) => c.innerText === VACIO);

  if (celdasLibres.length === 0) return;

  let celda = celdasLibres[Math.floor(Math.random() * celdasLibres.length)];
  realizarMovimiento(celda);
}

addEvento(celdas);
