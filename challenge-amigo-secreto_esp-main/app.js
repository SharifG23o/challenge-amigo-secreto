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

/**
 * Función para realizar el sorteo del amigo secreto.
 * 
 * Asigna un amigo secreto a cada participante, asegurando que no se asignen a sí mismos.
 */
function sortearAmigo() {
    // Verificamos que haya al menos dos amigos para realizar el sorteo
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para el sorteo.");
        return;
    }

    // Creamos una copia de la lista de amigos para trabajar con ella sin modificar la lista original
    let copiaAmigos = [...listaAmigos];

    // Inicializamos el objeto para almacenar los amigos secretos
    amigosSecretos = {};

    // Iteramos sobre la lista de amigos para asignar un amigo secreto a cada uno
    for (let i = 0; i < listaAmigos.length; i++) {
        // Seleccionamos un índice aleatorio de la lista de amigos
        let indice = Math.floor(Math.random() * copiaAmigos.length);

        // Nos aseguramos de que el amigo no se sortee a sí mismo
        while (copiaAmigos[indice] === listaAmigos[i]) {
            indice = Math.floor(Math.random() * copiaAmigos.length);
        }

        // Asignamos el amigo secreto
        amigosSecretos[listaAmigos[i]] = copiaAmigos[indice];

        // Eliminamos el amigo sorteado de la copia para no repetirlo
        copiaAmigos.splice(indice, 1);
    }

    // Llamamos a la función para mostrar los resultados del sorteo
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

/**
 * Función para adivinar el amigo secreto de un participante.
 * 
 * Permite a un usuario adivinar quién era el amigo secreto de una persona seleccionada al azar.
 */
function adivinarAmigoSecreto() {
    // Verificamos que haya al menos dos amigos para permitir adivinaciones
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para adivinar.");
        return;
    }

    // Seleccionamos un amigo al azar de la lista
    let indice = Math.floor(Math.random() * listaAmigos.length);
    let amigo = listaAmigos[indice];

    // Pedimos al usuario que adivine el amigo secreto
    let mensaje = prompt("¿Quién era el amigo secreto de " + amigo + "?", "");

    // Comprobamos si la adivinanza es correcta
    if (mensaje === amigosSecretos[amigo]) {
        alert("¡Correcto! Has adivinado quién era el amigo secreto de " + amigo + ".");
    } else {
        alert("¡Incorrecto! El amigo secreto de " + amigo + " era " + amigosSecretos[amigo] + ".");
    }
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
