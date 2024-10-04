/* Este script contiene las comprobaciones que se usa en este script y en el de game */
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
            if (document.getElementById(celda.id) == null) {
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
    var comprobarFlag = false;

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let primerNumero = celdas[combinacionesGanadoras[i][0]].children[0];
        let segundoNumero = celdas[combinacionesGanadoras[i][1]].children[0];
        let tercerNumero = celdas[combinacionesGanadoras[i][2]].children[0];

        if (primerNumero.value == "X" && segundoNumero.value == "X" && tercerNumero.value == "X") {
            colorearResultado(primerNumero, segundoNumero, tercerNumero, true);
            mostrarResultado(true);
            comprobarFlag = true;
        } else if (primerNumero.value == "O" && segundoNumero.value == "O" && tercerNumero.value == "O") {
            colorearResultado(primerNumero, segundoNumero, tercerNumero, false);
            mostrarResultado(false);
            comprobarFlag = true;
        }
    }

    finPartida = comprobarFlag;
    return comprobarFlag;
}
