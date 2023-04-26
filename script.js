let intentos= 6;
const BOTON= document.getElementById('guess-button');
const BOTON2=document.getElementById('try-again');
const INTENTO=document.getElementById('guess-input');
const BOTONAYUDA= document.getElementById('boton-ayuda');
const BOTONCERRAR= document.getElementById('boton-Cerrar');
const ERROR = document.getElementById('error');
/*Implementar Api */

//obtener la palabra al abrir la pagina
const API= 'https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es'
//FUNCION ASINCRONA:TARDA TIEMPO, usar then para que haga algo cuando la api devuelva una respuesta
fetch(API).then(response=>response.json()).
then(response=> {
     palabra=response[0].toUpperCase();
    //Al inspeccionar para corroborar la palabra
    console.log(palabra)
})
//Permite hacer algo cuando hay error
.catch(err=>{
    //usar el array que creamos en el anterior
    const diccionario = ['POETA', 'RAMOS', 'RATON', 'CIELO','PLUMA','HONGO','FRESA','SALSA','LIMON','PLAYA'];
     palabra= seleccionarPalabra(diccionario);
    console.log(palabra, "Hubo un problema con la Api");
})
  
/*----EVENTOS---- */
BOTON.addEventListener('click',() => {
    if (INTENTO.value === '') {
        ERROR.style.display = 'block';
    }
    else{
    ERROR.style.display = 'none';
    intentar();
    INTENTO.value='';
    }
})
BOTON2.addEventListener('click', () => {
    // Recarga la pagina para volver a jugar
   location.reload();
})
//Muestra informacion acerca del juego
BOTONAYUDA.addEventListener('click',() => {
    document.getElementById(("informacion")).style.display = "block";
})
//Vuelve a mostrar la pantalla del juego
BOTONCERRAR.addEventListener('click',() => {
    document.getElementById(("informacion")).style.display = "none";
})
//Validar enter
INTENTO.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter') {
        if (INTENTO.value === '') {
            ERROR.style.display = 'block';
        }
        else{
        ERROR.style.display = 'none';
        intentar();
        INTENTO.value='';
        }
 }})

/*-----FUNCIONES----- */

// Selecciona una palabra aleatoria usando random()
function seleccionarPalabra(arreglo){
    let cantElementos= arreglo.length;
    //aplicar formula Math.floor(Math.random() * 10) + 1;
    const palabraAleatoria = arreglo[Math.floor(Math.random() * cantElementos)];
    return palabraAleatoria;
}
function leerIntento(){
    let intento= document.getElementById('guess-input').value;
    return intento.toUpperCase();
}
//Algoritmo del juego
function intentar(){
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    if(INTENTO=== palabra){
        terminar("<h2> Has ganado, felicidades :) </h2>");
        document.getElementById(('guess-button')).style.display = "none";
        document.getElementById(('try-again')).style.display = "block";  
        return INTENTO
    }
    if (intentos==0){
        terminar("<h2> Se acabaron los intentos :( </h2>\n");
        //Desaparece intentar y aparece la opcion volver a intentar
        document.getElementById(('guess-button')).style.display = "none";
        document.getElementById(('try-again')).style.display = "block";
    }
    return  

}
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML=mensaje;
}
