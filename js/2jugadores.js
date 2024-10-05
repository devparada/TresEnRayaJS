/* Este script se utiliza en la página 2jugadores.html */
/* Las constantes, variables y funciones están en game.js */
function addEvento(celdas) {
    celdas.forEach((celda) => {
        celda.addEventListener("click", (e) => {
            var celda = e.target;
            if (comprobarValido(celda) && !comprobarGanador()) {
                console.log(click);
                if (click % 2 === 0) {
                    primerJugador(celda.id);
                    comprobarGanador();
                } else {
                    segundoJugador(celda.id);
                    comprobarGanador();
                }
                click++;
            }
        })
    });
}

function segundoJugador(celda) {
    document.getElementById(celda).value = "O";
    document.getElementById(celda).setAttribute("disable", "");
}

addEvento(celdas);
