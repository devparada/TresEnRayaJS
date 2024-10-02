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
            var celda = e.target;
            if (comprobarValido(celda) && !comprobarGanador()) {
                primerJugador(celda.id);
                comprobarGanador();
                await sleep(250);
                segundoJugadorCPU();
                comprobarGanador();
            }
        })
    });
}

function primerJugador(celda) {
    document.getElementById(celda).value = "X";
    document.getElementById(celda).setAttribute("disable", "");
}

function segundoJugadorCPU() {
    var maxNumero = celdas.length - 1;
    var numero = Math.floor(Math.random() * (maxNumero - 0 + 1) + 0);
    var nombreElemento = "celda" + numero;
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

async function colorearResultado(celda0, celda1, celda2, estado) {
    if (!finPartida) {
        // Red
        let color = "#EB6F6F";
        if (estado) {
            // Green
            color = "#29DC27";
        }
        await sleep(300);

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

        document.getElementById("resultado").innerText = texto;
        comprobarEstadoPartida(false);
    }
}

function comprobarValido(celda) {
    // \u00A0 -> es &nbsp; (un espacio)
    if (document.getElementById(celda.id).getAttribute("value") == "\u00A0\u00A0\u00A0") {
        return true;
    }
    return false;
}

function comprobarEstadoPartida(estado) {
    if (estado) {
        celdas.forEach((celda) => {
            if (comprobarValido(celda)) {
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
        let primerNumero = celdas[combinacionesGanadoras[i][0]].children[0];
        let segundoNumero = celdas[combinacionesGanadoras[i][1]].children[0];
        let tercerNumero = celdas[combinacionesGanadoras[i][2]].children[0];

        if (primerNumero.value == "X" && segundoNumero.value == "X" && tercerNumero.value == "X") {
            colorearResultado(primerNumero, segundoNumero, tercerNumero, true);
            mostrarResultado(true);
            return true;
        } else if (primerNumero.value == "O" && segundoNumero.value == "O" && tercerNumero.value == "O") {
            colorearResultado(primerNumero, segundoNumero, tercerNumero, false);
            mostrarResultado(false);
            return true;
        }
    }

    mostrarEmpate();
    return false;
}

addEvento(celdas);