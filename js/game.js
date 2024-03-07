const celdas = document.querySelectorAll("td");
var click = 0;
var finPartida = false;

function addEvent(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", (e) => {
            let boton = e.target;
            if (comprobarValido(boton) && comprobarValido(boton)) {
                primerJugador(boton.id);
                segundoJugadorCPU();
            } else if (!comprobarValido(boton)) {
                findePartida();
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
    var nombreElemento = "texto" + numero;
    var elemento = document.getElementById(nombreElemento);

    if (elemento.value != "O" && elemento.value != "X") {
        elemento.value = "O";
        elemento.setAttribute("disable", "");
        click++;
    } else if (click <= 3) {
        segundoJugadorCPU();
    } else {
        comprobarEstadoPartida();
    }
}

function comprobarValido(celda) {
    if (document.getElementById(celda.id).getAttribute("value") == undefined) {
        return true;
    }
    return false;
}

function comprobarEstadoPartida() {
    celdas.forEach((celda) => {
        console.log(celda.children[0]);
        if (celda.children[0].getAttribute("value") != null) {
            finPartida = true;
            findePartida();
        } else {
            finPartida = false;
            return true;
        }
    });

    return false;
}

function findePartida() {
    console.log("Depuración: " + finPartida);
    if (finPartida) {
        document.getElementById("resultado").innerText = "Fin de partida";
    }
}

addEvent(celdas);