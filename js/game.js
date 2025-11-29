/* Este script se utiliza en las páginas cpu.html y 2jugadores.html */
/* Almacena las constantes, variables y funciones comunes */
"use strict";

// Constantes
const elemResultado = document.querySelector("#resultado");
const elemTurnado = document.querySelector("#turnado");
const fondoCeldas = "#33415566";
const jugadorcadena = "👤 Jugador";
const cpuCadena = "🤖 CPU";
const jugador1cadena = "👤 X";
const jugador2cadena = "👤 O";
const VACIO = "";

// Variables
let click = 0;
let finPartida = false;
let turnoBloqueado = false;
let movimientos = 0;
let celdas = document.querySelectorAll(".celdas");
let scriptCPU;

globalThis.onload = () => {
  localStorage.clear();
  scriptCPU = document.querySelector("#scriptCPU");
  if (scriptCPU) {
    contadores();
  }
};

function contadores() {
  ["CPU", "Tu"].forEach((tipo) => {
    const clave = `victorias${tipo}`;
    const valor = localStorage.getItem(clave) || 0;
    document.querySelector(`#contador${tipo}`).innerText = valor;
  });
}

/**
 * Espera una cantidad de milisegundos
 * @param {*} ms - Milisegundos a esperar
 * @returns
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function primerJugador(celda) {
  let celdaElement = document.getElementById(celda);
  celdaElement.innerText = "X";
  celdaElement.setAttribute("disabled", "");
  if (scriptCPU) elemTurnado.innerText = cpuCadena;
  if (!scriptCPU) elemTurnado.innerText = jugador2cadena;
  contadorMovimientos();
}

async function colorearResultado(c0, c1, c2, estado) {
  // Colores
  const RED = "#EB6F6F";
  const GREEN = "#29DC27";

  let color = RED;
  if (estado) color = GREEN;
  
  let textColor = "black";
  await sleep(150);

  [c0, c1, c2].forEach((celda) => {
    celda.style.backgroundColor = color;
    celda.style.color = textColor;
  });
}

function actualizarContadores(estado) {
  const ganador = estado ? "Tu" : "CPU";
  const clave = `victorias${ganador}`;
  const contador = `contador${ganador}`;

  let valor = Number(localStorage.getItem(clave)) || 0;
  valor++;

  localStorage.setItem(clave, valor);
  document.getElementById(contador).innerText = valor;
}

function mostrarResultado(estado) {
  document.getElementById("tituloTurnado").innerText = "GANADOR:";
  document.getElementById("turnado").innerText = estado ? jugadorcadena : cpuCadena;
  if (scriptCPU) actualizarContadores(estado);
}

function mostrarEmpate() {
  elemResultado.innerText = "Empate";
}

function limpiarTablero() {
  celdas.forEach((celda) => {
    celda.style.backgroundColor = "";
    celda.style.color = "";
    celda.innerText = VACIO;
    celda.removeAttribute("disabled");
  });
  celdas = document.querySelectorAll(".celdas");
  movimientos = 0;
  document.querySelector("#tituloTurnado").innerText = "TURNO";
  document.querySelector("#movimientos").innerText = movimientos;
}

function volverJugar() {
  limpiarTablero();
  elemResultado.innerText = "Jugando";

  click = 0;
  finPartida = false;
  if (scriptCPU) {
    contadores();
    document.querySelector("#turnado").innerText = jugadorcadena;
  }
}

function comprobarValido(celda) {
  return celda.innerText === VACIO;
}

function comprobarEstadoPartida() {
  if (finPartida) {
    celdas.forEach((celda) => {
      celda.setAttribute("disabled", "");
    });
    document.querySelector("#resultado").innerText = "Fin";
  }
}

async function comprobarGanador() {
  const combinacionesGanadoras = [
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

    if (
      primerNumero.innerText == "X" &&
      segundoNumero.innerText == "X" &&
      tercerNumero.innerText == "X"
    ) {
      finPartida = true;
      colorearResultado(primerNumero, segundoNumero, tercerNumero, true);
      mostrarResultado(true);
    } else if (
      primerNumero.innerText == "O" &&
      segundoNumero.innerText == "O" &&
      tercerNumero.innerText == "O"
    ) {
      finPartida = true;
      colorearResultado(primerNumero, segundoNumero, tercerNumero, false);
      mostrarResultado(false);
    }
  }

  return finPartida;
}

function comprobarEmpate() {
  if (finPartida) return;

  for (let i = 0; i < celdas.length; i++) {
    if (celdas[i].innerText === VACIO) {
      return false;
    }
  }
  return true;
}

function contadorMovimientos() {
  if (finPartida) return;
  movimientos++;
  document.querySelector("#movimientos").innerText = movimientos;
}

function menuBoton() {
  globalThis.location.href = "../index.html";
}
