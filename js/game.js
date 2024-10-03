// Constantes
const celdas = document.querySelectorAll("td");
const elemResultado = document.getElementById("resultado");

// Variables
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
    elemResultado.innerText = "Empate";
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

addEvento(celdas);