// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

/**
 * Programa: Challenge del Amigo secreto
 * Autor: Sharif Giraldo Obando
 * Fecha: 2025-02
 * Licencia: GNU GPL v3
 */


// Inicializamos la lista de amigos 


let listaAmigos = [];


//Reutilizamos la función de asignarTextoElemento

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}



//Reutilizamos la función de limpiar caja
function limpiarCaja() {

    //querySelector por ID

    document.querySelector('#amigo').value = '';
}



// Definimos la función agregarAmigo()

function agregarAmigo() {

    // Pedimos al usuario que ingrese el nombre del amigo

    let nombreAmigo = document.getElementById('amigo').value;
    if (nombreAmigo == '') {
        alert("Por favor ingrese el nombre del amigo (En un formato válido)");
    } else {
        // Agregamos el nombre del amigo a la lista de amigos
        listaAmigos.push(nombreAmigo);
        // Mostramos la lista de amigos en el elemento HTML con id "listaAmigos"
        asignarTextoElemento("#listaAmigos", listaAmigos.join("<br>"));

        //Limpiamos el campo

        limpiarCaja();


    }


}


// Función para sortear los amigos secretos
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para el sorteo.");
        return;
    }

    // Crear una copia de la lista de amigos
    let copiaAmigos = [...listaAmigos];

    // Limpiar el objeto de amigos secretos
    amigosSecretos = {};

    for (let i = 0; i < listaAmigos.length; i++) {
        // Asegurarse de que un amigo no se sortee a sí mismo
        let indice = Math.floor(Math.random() * copiaAmigos.length);
        while (copiaAmigos[indice] === listaAmigos[i]) {
            indice = Math.floor(Math.random() * copiaAmigos.length);
        }

        // Asignar el amigo secreto
        amigosSecretos[listaAmigos[i]] = copiaAmigos[indice];

        // Eliminar el amigo sorteado de la copia
        copiaAmigos.splice(indice, 1);
    }

    // Mostrar los resultados
    mostrarResultado();
}

// Función para mostrar los resultados en la interfaz
function mostrarResultado() {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    let elementos = "";
    for (let amigo in amigosSecretos) {
        elementos += `<li>${amigo} → ${amigosSecretos[amigo]}</li>`;
    }

    listaResultado.innerHTML = elementos;
}

// Función para adivinar el amigo secreto
function adivinarAmigoSecreto() {
    if (listaAmigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para adivinar.");
        return;
    }

    // Selecciona un amigo al azar para hacer la pregunta
    let indice = Math.floor(Math.random() * listaAmigos.length);
    let amigo = listaAmigos[indice];

    // Pregunta quién era el amigo secreto de este amigo
    let mensaje = prompt("¿Quién era el amigo secreto de " + amigo + "?", "");

    // Verifica si la adivinanza es correcta
    if (mensaje === amigosSecretos[amigo]) {
        alert("¡Correcto! Has adivinado quién era el amigo secreto de " + amigo + ".");
    } else {
        alert("¡Incorrecto! El amigo secreto de " + amigo + " era " + amigosSecretos[amigo] + ".");
    }

    
}

function reiniciarAmigoSecreto(){
    document.querySelector('#amigo').innerHTML = '';
    document.querySelector('#listaAmigos').innerHTML = '';  
    document.querySelector('#resultado').innerHTML = '';

}

