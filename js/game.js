// Variables del script
const celdas = document.querySelectorAll("td");
var finPartida = false;
var click = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", async (e) => {
            var boton = e.target;
            if (comprobarValido(boton) && !comprobarGanador()) {
                primerJugador(boton.id);
                comprobarGanador();
                await sleep(250);
                segundoJugadorCPU();
                comprobarGanador();
            }
        })
    });
}

function primerJugador(boton) {
    document.getElementById(boton).value = "X";
    document.getElementById(boton).setAttribute("disable", "");
}

function segundoJugadorCPU() {
    var numero = Math.floor(Math.random() * (8 - 0 + 1) + 0);
    var nombreElemento = "boton" + numero;
    var elemento = document.getElementById(nombreElemento);

    if (elemento.value != "O" && elemento.value != "X") {
        elemento.value = "O";
        elemento.setAttribute("disable", "");
        click++;
    } else if (click <= 3) {
        segundoJugadorCPU();
        comprobarEstadoPartida(false);
    } else {
        comprobarGanador();
        comprobarEstadoPartida(true);
    }
}

function mostrarEmpate() {
    if (finPartida) {
        document.getElementById("resultado").innerText = "Empate";
    }
}

function colorearResultado(celda0, celda1, celda2, estado) {
    // Red
    let color = "#EB6F6F";
    if (estado) {
        // Green
        color = "#29DC27";
    }

    // Para dar el color a la celda de la tabla
    celda0.parentElement.style.backgroundColor = color;
    celda1.parentElement.style.backgroundColor = color;
    celda2.parentElement.style.backgroundColor = color;
    // Para dar el color en el input
    celda0.style.backgroundColor = color;
    celda1.style.backgroundColor = color;
    celda2.style.backgroundColor = color;
}

function mostrarResultado(estado) {
    let texto = "Has perdido"
    if (estado) {
        texto = "Has ganado";
    }

    document.getElementById("resultado").innerText = texto;
    comprobarEstadoPartida(false);
}

function comprobarValido(celda) {
    if (document.getElementById(celda.id).getAttribute("value") == undefined) {
        return true;
    }
    return false;
}

function comprobarEstadoPartida(estado) {
    if (estado) {
        celdas.forEach((celda) => {
            if (celda.children[0].getAttribute("value") != null) {
                finPartida = true;
                mostrarEmpate();
            } else {
                finPartida = false;
            }
        });
    } else {
        celdas.forEach((celda) => {
            celda.setAttribute("disable", "");
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
        if (celdas[combinacionesGanadoras[i][0]].children[0].value == "X" && celdas[combinacionesGanadoras[i][1]].children[0].value == "X" && celdas[combinacionesGanadoras[i][2]].children[0].value == "X") {
            colorearResultado(celdas[combinacionesGanadoras[i][0]].children[0], celdas[combinacionesGanadoras[i][1]].children[0], celdas[combinacionesGanadoras[i][2]].children[0], true);
            mostrarResultado(true);
            return true;
        } else if (celdas[combinacionesGanadoras[i][0]].children[0].value == "O" && celdas[combinacionesGanadoras[i][1]].children[0].value == "O" && celdas[combinacionesGanadoras[i][2]].children[0].value == "O") {
            colorearResultado(celdas[combinacionesGanadoras[i][0]].children[0], celdas[combinacionesGanadoras[i][1]].children[0], celdas[combinacionesGanadoras[i][2]].children[0], false);
            mostrarResultado(false);
            return true;
        }
    }

    mostrarEmpate();
    return false;
}

addEvento(celdas);