/* Este script se utiliza en la página cpu.html */
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", (e) => {
            var celda = e.target;
            if (comprobarValido(celda) && !comprobarGanador()) {
                primerJugador(celda.id);
                comprobarGanador();
                segundoJugador(celda.id);
                comprobarGanador();
            }
        })
    });
}


function segundoJugador() {
    var maxNumero = celdas.length - 1;
    var numero = Math.floor(Math.random() * (maxNumero - 0 + 1) + 0);
    var nombreElemento = "celda" + numero;
    var elemento = document.getElementById(nombreElemento);

    if (elemento.value != "O" && elemento.value != "X") {
        elemento.value = "O";
        elemento.setAttribute("disable", "");
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
