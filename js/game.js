const celdas = document.querySelectorAll("td");
var click = 0;
var finPartida = false;

function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", (e) => {
            var boton = e.target;
            if (comprobarValido(boton) && !comprobarGanador()) {
                primerJugador(boton.id);
                comprobarGanador();
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

function mostrarResultado(estado) {
    if (estado) {
        document.getElementById("resultado").innerText = "Has ganado";
    } else {
        document.getElementById("resultado").innerText = "Has perdido";
    }
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
    if (celdas[0].children[0].value == "X" && celdas[4].children[0].value == "X" && celdas[8].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[0].children[0].value == "O" && celdas[4].children[0].value == "O" && celdas[8].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[0].children[0].value == "X" && celdas[3].children[0].value == "X" && celdas[6].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[0].children[0].value == "O" && celdas[3].children[0].value == "O" && celdas[6].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[0].children[0].value == "X" && celdas[1].children[0].value == "X" && celdas[2].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[0].children[0].value == "O" && celdas[1].children[0].value == "O" && celdas[2].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[0].children[0].value == "X" && celdas[4].children[0].value == "X" && celdas[8].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[0].children[0].value == "O" && celdas[4].children[0].value == "O" && celdas[8].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[2].children[0].value == "X" && celdas[5].children[0].value == "X" && celdas[8].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[2].children[0].value == "O" && celdas[5].children[0].value == "O" && celdas[8].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[2].children[0].value == "X" && celdas[4].children[0].value == "X" && celdas[6].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[2].children[0].value == "O" && celdas[4].children[0].value == "O" && celdas[6].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }


    if (celdas[3].children[0].value == "X" && celdas[4].children[0].value == "X" && celdas[5].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[3].children[0].value == "O" && celdas[4].children[0].value == "O" && celdas[5].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    if (celdas[6].children[0].value == "X" && celdas[7].children[0].value == "X" && celdas[8].children[0].value == "X") {
        mostrarResultado(true);
        return true;
    } else if (celdas[6].children[0].value == "O" && celdas[7].children[0].value == "O" && celdas[8].children[0].value == "O") {
        mostrarResultado(false);
        return true;
    }

    mostrarEmpate();
    return false;
}

addEvento(celdas);