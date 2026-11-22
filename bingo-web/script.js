// ======================
// PANTALLAS
// ======================

const menuPrincipal =
    document.getElementById("menuPrincipal");

const modoFisico =
    document.getElementById("modoFisico");

const modoIA =
    document.getElementById("modoIA");

const modoMultijugador =
    document.getElementById("modoMultijugador");

// ======================
// BOTONES DEL MENÚ
// ======================

const btnFisico =
    document.getElementById("btnFisico");

const btnIA =
    document.getElementById("btnIA");

const btnMulti =
    document.getElementById("btnMulti");

const volverMenu =
    document.getElementById("volverMenu");

// ======================
// ELEMENTOS MODO FÍSICO
// ======================

const botonSacar =
    document.getElementById("sacar");

const botonReiniciar =
    document.getElementById("reiniciar");

const bola =
    document.getElementById("bola");

const historial =
    document.getElementById("historial");

const zonaCartones =
    document.getElementById(
        "zonaCartones"
    );

const crearCartonesBtn =
    document.getElementById(
        "crearCartones"
    );


// ======================
// MODO IA
// ======================

const cartonJugador =
    document.getElementById("cartonJugador");

const cartonIA =
    document.getElementById("cartonIA");

const botonSacarIA =
    document.getElementById("sacarIA");

const botonReiniciarIA =
    document.getElementById("reiniciarIA");

const volverMenuIA =
    document.getElementById("volverMenuIA");

const bolaIA =
    document.getElementById("bolaIA");

// ======================
// DATOS DEL JUEGO
// ======================

let numerosDisponibles = [];

let numerosSalidos = [];

let cartonJugadorActual = [];

let cartonIAActual = [];

let ultimasBolasIA = [];

let partidaTerminada = false;

crearBombo();

// ======================
// CREAR BOMBO
// ======================

function crearBombo() {

    numerosDisponibles = [];

    for (let i = 1; i <= 90; i++) {

        numerosDisponibles.push(i);

    }

}

function generarCarton() {

    let carton = Array(27).fill(null);

    const rangos = [

        [1, 9],
        [10, 19],
        [20, 29],
        [30, 39],
        [40, 49],
        [50, 59],
        [60, 69],
        [70, 79],
        [80, 90]

    ];

    let huecosPorFila = [4, 4, 4];

    for (let col = 0; col < 9; col++) {

        let disponibles = [];

        for (let fila = 0; fila < 3; fila++) {

            if (huecosPorFila[fila] > 0) {

                disponibles.push(fila);

            }

        }

        let hueco =
            disponibles[
                Math.floor(
                    Math.random() *
                    disponibles.length
                )
            ];

        huecosPorFila[hueco]--;

        for (let fila = 0; fila < 3; fila++) {

            if (fila === hueco) continue;

            let numero =
                Math.floor(
                    Math.random() *
                    (rangos[col][1] - rangos[col][0] + 1)
                ) + rangos[col][0];

            carton[
                fila * 9 + col
            ] = numero;

        }

    }

    for (let col = 0; col < 9; col++) {

        let valores = [];

        for (let fila = 0; fila < 3; fila++) {

            let valor =
                carton[fila * 9 + col];

            if (valor !== null) {

                valores.push(valor);

            }

        }

        valores.sort((a, b) => a - b);

        let indice = 0;

        for (let fila = 0; fila < 3; fila++) {

            if (
                carton[fila * 9 + col]
                !== null
            ) {

                carton[
                    fila * 9 + col
                ] = valores[indice];

                indice++;

            }

        }

    }

    return carton;

}

function mostrarCarton(
    contenedor,
    numeros
) {

    contenedor.innerHTML = "";

    numeros.forEach(numero => {

        let casilla =
            document.createElement("div");

        if (numero === null) {

            casilla.className =
                "casilla-vacia";

        }

        else {

            casilla.className =
                "casilla";

            casilla.textContent =
                numero;

            if (
                contenedor !==
                cartonIA
            ){

                casilla.addEventListener(
                    "click",
                    () => {

                        if (
                            contenedor === cartonJugador &&
                            !numerosSalidos.includes(
                                numero
                            )
                        ) {
                            return;
                        }

                        casilla.classList.toggle(
                            "marcada"
                        );

                        comprobarGanador();

                    }
                );

            }

        }

        contenedor.appendChild(
            casilla
        );

    });

}

// ======================
// NAVEGACIÓN
// ======================

function ocultarTodo() {

    menuPrincipal.style.display = "none";

    modoFisico.style.display = "none";

    modoIA.style.display = "none";

    modoMultijugador.style.display = "none";

}

function abrirModoFisico() {

    ocultarTodo();

    modoFisico.style.display = "block";

}

function abrirModoIA() {
    
    partidaTerminada = false;

    ultimasBolasIA = [];

    document.getElementById("historialIA")
        .textContent =
        "Últimas bolas: -";

    ocultarTodo();

    modoIA.style.display = "block";

    cartonJugadorActual =
        generarCarton();

    cartonIAActual =
        generarCarton();

    mostrarCarton(
        cartonJugador,
        cartonJugadorActual
    );

    mostrarCarton(
        cartonIA,
        cartonIAActual
    );

}

function abrirModoMultijugador() {

    ocultarTodo();

    modoMultijugador.style.display = "block";

}

function volverAlMenu() {

    ocultarTodo();

    menuPrincipal.style.display = "block";

}

// ======================
// SACAR BOLA
// ======================

function sacarBola() {

    if (numerosDisponibles.length === 0) {

        bola.textContent = "FIN";

        return;

    }

    let animacion = setInterval(() => {

        let numeroTemporal =
            Math.floor(Math.random() * 90) + 1;

        bola.textContent = numeroTemporal;

    }, 50);

    setTimeout(() => {

        clearInterval(animacion);

        let indiceAleatorio = Math.floor(
            Math.random() * numerosDisponibles.length
        );

        let numero =
            numerosDisponibles[indiceAleatorio];

        numerosDisponibles.splice(
            indiceAleatorio,
            1
        );

        numerosSalidos.push(numero);

        bola.textContent = numero;

        historial.textContent =
            numerosSalidos.join(" - ");

        bola.style.animation = "none";

        void bola.offsetWidth;

        bola.style.animation =
            "nuevaBola 0.4s ease";

    }, 1000);

}

function sacarBolaIA() {

    if (partidaTerminada) {

        return;

        }
        
    if (numerosDisponibles.length === 0) {

        bolaIA.textContent = "FIN";

        return;

    }

    let animacion = setInterval(() => {

        let numeroTemporal =
            Math.floor(Math.random() * 90) + 1;

        bolaIA.textContent = numeroTemporal;

    }, 50);

    setTimeout(() => {

        clearInterval(animacion);

        let indiceAleatorio = Math.floor(
            Math.random() * numerosDisponibles.length
        );

        let numero =
            numerosDisponibles[indiceAleatorio];

        numerosDisponibles.splice(
            indiceAleatorio,
            1
        );

        bolaIA.textContent = numero;
        
        numerosSalidos.push(numero);
        
        ultimasBolasIA.push(numero);

        if (ultimasBolasIA.length > 6) {

            ultimasBolasIA.shift();

        }

        document.getElementById("historialIA")
            .textContent =
            "Últimas bolas: " +
            ultimasBolasIA.join(" • ");

        marcarIA(numero);

        bolaIA.style.animation =
            "none";

        void bolaIA.offsetWidth;

        bolaIA.style.animation =
            "nuevaBola 0.4s ease";

    }, 1000);

}

function marcarIA(numero) {

    let casillas =
        cartonIA.querySelectorAll(".casilla");

    casillas.forEach(casilla => {

        if (
            casilla.textContent ==
            numero
        ) {

            casilla.classList.add(
                "marcada"
            );

        }

    });

    comprobarGanador();

}

function comprobarGanador() {

    let jugadorMarcadas =
        cartonJugador.querySelectorAll(
            ".marcada"
        ).length;

    let iaMarcadas =
        cartonIA.querySelectorAll(
            ".marcada"
        ).length;

    if (
        jugadorMarcadas >= 15 &&
        !partidaTerminada
    ) {

        partidaTerminada = true;

        alert("🏆 ¡HAS GANADO!");

    }

    if (
        iaMarcadas >= 15 &&
        !partidaTerminada
    ) {

        partidaTerminada = true;

        alert("💀 Has perdido");

    }

}

function crearCartonesMultijugador() {

    zonaCartones.innerHTML = "";

    let cantidad =
        parseInt(
            document.getElementById(
                "cantidadCartones"
            ).value
        );

    for (
        let i = 1;
        i <= cantidad;
        i++
    ) {

        let panel =
            document.createElement("div");

        panel.className =
            "carton";

        let titulo =
            document.createElement("h2");

        titulo.textContent =
            "🎱 Cartón " + i;

        let contenedor =
            document.createElement("div");

        contenedor.className =
            "cartonGrid";
        
        panel.appendChild(
            titulo
        );

        panel.appendChild(
            contenedor
        );

        zonaCartones.appendChild(
            panel
        );

        mostrarCarton(
            contenedor,
            generarCarton()
        );

    }

}

// ======================
// REINICIAR JUEGO
// ======================

function reiniciarJuego() {

    crearBombo();

    numerosSalidos = [];

    bola.textContent = "00";

    historial.textContent =
        "Aún no ha salido ninguna bola.";

}

// ======================
// EVENTOS
// ======================

btnFisico.addEventListener(
    "click",
    abrirModoFisico
);

btnIA.addEventListener(
    "click",
    abrirModoIA
);

btnMulti.addEventListener(
    "click",
    abrirModoMultijugador
);

volverMenu.addEventListener(
    "click",
    volverAlMenu
);

botonSacar.addEventListener(
    "click",
    sacarBola
);

botonReiniciar.addEventListener(
    "click",
    reiniciarJuego
);

botonSacarIA.addEventListener(
    "click",
    sacarBolaIA
);

crearCartonesBtn.addEventListener(
    "click",
    crearCartonesMultijugador
);

// ======================
// INICIO
// ======================

ocultarTodo();

menuPrincipal.style.display =
    "block";

botonReiniciarIA.addEventListener(
    "click",
    abrirModoIA
);

volverMenuIA.addEventListener(
    "click",
    volverAlMenu
);

crearCartonesBtn.addEventListener(
    "click",
    crearCartonesMultijugador
);
