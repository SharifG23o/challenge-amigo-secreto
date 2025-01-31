// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

/**
 * Programa: Challenge del Amigo secreto
 * Autor: Sharif Giraldo Obando
 * Fecha: 2025-02
 * Licencia: GNU GPL v3
 */

// Inicializamos la lista de amigos
let listaAmigos = [];



/**
 * Función reutilizable para asignar texto a un elemento HTML.
 * 
 * @param {string} elemento - El selector del elemento HTML donde se insertará el texto.
 * @param {string} texto - El texto que se asignará al elemento.
 */
function asignarTextoElemento(elemento, texto) {
    // Seleccionamos el elemento HTML por su selector
    let elementoHTML = document.querySelector(elemento);
    // Asignamos el texto al elemento HTML
    elementoHTML.innerHTML = texto;
}

/**
 * Función reutilizable para limpiar el campo de texto de ingreso de amigo.
 */
function limpiarCaja() {
    // Limpiamos el contenido del campo de texto con el ID 'amigo'
    document.querySelector('#amigo').value = '';
}

/**
 * Función para agregar un amigo a la lista.
 * 
 * Solicita al usuario el nombre de un amigo y lo agrega a la lista de amigos. Si el campo está vacío, muestra una alerta.
 */
function agregarAmigo() {
    // Pedimos al usuario que ingrese el nombre del amigo
    let nombreAmigo = document.getElementById('amigo').value;

    // Verificamos si el campo está vacío y mostramos una alerta si es necesario
    if (nombreAmigo == '') {
        alert("Por favor ingrese el nombre del amigo (En un formato válido)");
    } else {
        // Agregamos el nombre del amigo a la lista
        listaAmigos.push(nombreAmigo);
        // Actualizamos la visualización de la lista de amigos en el HTML
        asignarTextoElemento("#listaAmigos", listaAmigos.join("<br>"));
        // Limpiamos el campo de texto
        limpiarCaja();
    }
}


function sortearAmigo() {
    // Verificamos que haya al menos dos amigos
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para el sorteo.");
        return;
    }

    // Creamos una copia de la lista de amigos
    let amigosDisponibles = [];
    for (let i = 0; i < listaAmigos.length; i++) {
        amigosDisponibles[i] = listaAmigos[i];
    }
    
    // Creamos un objeto vacío para guardar los resultados
    amigosSecretos = {};

    // Para cada amigo en la lista original
    for (let i = 0; i < listaAmigos.length; i++) {
        // Elegimos un amigo al azar de los disponibles
        let indice = Math.floor(Math.random() * amigosDisponibles.length);
        
        // Guardamos quién le tocó a cada amigo
        amigosSecretos[listaAmigos[i]] = amigosDisponibles[indice];
        
        // Creamos una nueva lista temporal sin el amigo seleccionado
        let nuevaListaDisponibles = [];
        for (let j = 0; j < amigosDisponibles.length; j++) {
            if (j !== indice) {
                nuevaListaDisponibles.push(amigosDisponibles[j]);
            }
        }
        
        // Actualizamos la lista de amigos disponibles
        amigosDisponibles = nuevaListaDisponibles;
    }

    // Mostramos los resultados
    mostrarResultado();
}



/**
 * Función para mostrar los resultados del sorteo en la interfaz.
 */
function mostrarResultado() {
    // Seleccionamos el elemento HTML donde se mostrarán los resultados
    const listaResultado = document.getElementById("resultado");
    // Limpiamos el contenido del elemento de resultados
    listaResultado.innerHTML = "";

    // Inicializamos una cadena para almacenar los elementos de la lista
    let elementos = "";

    // Iteramos sobre el objeto de amigos secretos y mostramos los resultados
    for (let amigo in amigosSecretos) {
        // Agregamos cada relación de amigo secreto a la cadena de elementos
        elementos += `<li>${amigo} → ${amigosSecretos[amigo]}</li>`;
    }

    // Asignamos la cadena generada al elemento HTML
    listaResultado.innerHTML = elementos;
}

function adivinarAmigoSecreto() {
    if (listaAmigos.length < 2) {
        asignarTextoElemento("#resultado", "Se necesitan al menos 2 amigos para adivinar.");
        return;
    }

    // Verificamos si el sorteo ya se realizó
    if (!amigosSecretos) {
        asignarTextoElemento("#resultado", "El sorteo aún no se ha realizado.");
        return;
    }

    // Seleccionamos un amigo al azar de la lista
    let indice = Math.floor(Math.random() * listaAmigos.length);
    let amigo = listaAmigos[indice];

    // Pedimos al usuario que adivine el amigo secreto
    let mensaje = prompt("¿Quién era el amigo secreto de " + amigo + "?", "");

    // Verificamos si el amigo tiene un amigo secreto asignado
    if (amigosSecretos[amigo] === undefined) {
        asignarTextoElemento("#resultado", "El sorteo aún no se ha realizado correctamente.");
        return;
    }

    // Comprobamos si la adivinanza es correcta y mostramos el resultado en la pantalla
    if (mensaje === amigosSecretos[amigo]) {
        asignarTextoElemento("#resultado", "¡Correcto! Has adivinado quién era el amigo secreto de " + amigo + ".");
    } else {
        asignarTextoElemento("#resultado", "¡Incorrecto! El amigo secreto de " + amigo + " era " + amigosSecretos[amigo] + ".");
    }
}




/**
 * Función para obtener un amigo secreto aleatorio de la lista
 */
function amigoSecretoIndividual() {
    // Verificamos que haya amigos en la lista
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos en la lista");
        return;
    }

    // Seleccionamos un índice aleatorio
    let indice = Math.floor(Math.random() * listaAmigos.length);
    
    // Aseguramos que no me toque yo mismo como amigo secreto
    let miNombre = document.getElementById('amigo').value;
    while (listaAmigos[indice] === miNombre) {
        indice = Math.floor(Math.random() * listaAmigos.length);
    }

    // Mostramos el amigo secreto seleccionado
    asignarTextoElemento("#resultado", `Tu amigo secreto es: ${listaAmigos[indice]}`);
    
    // Limpiamos la caja de entrada
    limpiarCaja();
}






/**
 * Función para reiniciar el juego.
 * 
 * Limpiar todas las listas y resultados en la interfaz.
 */
function reiniciarAmigoSecreto() {
    // Limpiamos el campo de texto de ingreso de amigo
    document.querySelector('#amigo').innerHTML = '';
    // Limpiamos la lista de amigos
    document.querySelector('#listaAmigos').innerHTML = '';
    // Limpiamos los resultados del sorteo
    document.querySelector('#resultado').innerHTML = '';
}
