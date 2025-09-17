'use strict';

/**
 * Apartado 1
 * Realiza los siguientes pasos (muestra por consola el resultado después de aplicar cada uno):
 * - Crea un array con 4 elementos
 * - Concatena 2 elementos más al final y 2 al principio
 * - Elimina las posiciones de la 3 a la 5 (ambas incluidas)
 * - Inserta 2 elementos más entre el penúltimo y el último
 * - Muestra el array del paso anterior, pero con los elementos separados por " ==> "
 */

console.log('--------------- APARTADO 1 -----------------');
let miArray = [1, 2, 3, 4];
console.log(miArray);
miArray.push(5, 6);
console.log(miArray);
miArray.unshift(8, 9);
console.log(miArray);
console.log(miArray.join(" ==> "));

/**
 * Apartado 2
 * Crea una función que reciba como primer parámetro el nombre de un alumno, seguido
 * de un número indeterminado de notas (usa spread para agruparlas en un array).
 * Utiliza el método reduce para sumar las notas y calcula la media, que deberás mostrar por consola.
 * Posible llamada -> printMedia("Pepe", 4.25, 6, 8.5, 9)
 */

console.log('--------------- APARTADO 2 -----------------');

function notaMediaAlumno(nombre, ...notas) {
    const notaTotal = notas.reduce(
        (total, nota) => total + nota, 0,
    );
    const media = notaTotal / notas.length;
    console.log(`${nombre} tiene de media ${media}.`);
}

notaMediaAlumno("Manuel", 4.5, 6, 9, 10, 7);
notaMediaAlumno("Fulanito", 5, 5, 5, 5, 5);


/**
 * Apartado 3
 * Crea un array de cadenas y ordénalo usando el método sort de mayor a menor longitud .
 * Imprime el array original (antes de ordenarlo) y el resultado
 */

console.log('--------------- APARTADO 3 -----------------');
const arrayOriginal = ["Casa", "Ontinyent", "Viernes", "Valenciaga", "Estación", "Sol"];
console.log(arrayOriginal);
const arrayOrdenada = arrayOriginal.sort((a, b) => {
    return b.length - a.length
});
console.log(arrayOrdenada)

/**
 * Apartado 4
 * Crea un array de números de más de una cifra. Mapea ese array en otro que sea la suma de las cifras de cada número. No puedes usar bucles.
 * Pista: Puedes convertir los números a cadena primero y después con Array.from(cadena) la transformas a array de caracteres (que puedes sumar)
 * Imprime el array original y el resultado
 */

console.log('--------------- APARTADO 4 -----------------');
const arrayInicial = [12, 52, 63, 1, 4];
console.log(arrayInicial);
const arrayFinal = arrayInicial.map((a) => {
    const numeros = Array.from(a.toString(), (x) => Number(x));
    return numeros.reduce((total, numero) => total + numero);
})
console.log(arrayFinal)

/**
 * Apartado 5
 * Crea una función calcule el área de un triángulo. Esta función recibirá 3 parámetros:
 * 2 lados del triángulo, y el ańgulo entre ellos (en grados).
 * Para calcular el área con estos datos debemos aplicar la fórmula: (1/2)*lado1*lado2*seno(ángulo).
 * Debes tener en cuenta que para aplicar la fórmula, el ángulo debe estar en radianes. Para pasarlo
 * a radianes lo multiplicamos por PI y dividimos entre 180.
 */

console.log('--------------- APARTADO 5 -----------------');

function areaTriangulo(lado1, lado2, angulo) {
    if (typeof lado1 != "number" || typeof lado2 != "number" || typeof angulo != "number") {
        console.log("Parámetros introducidos no válidos.")
        return;
    }

    const area = (1 / 2) * lado1 * lado2 * Math.sin(angulo * Math.PI / 180);
    console.log(`El área del tringulo es de ${area.toFixed(3)}`);
}

areaTriangulo(3, 5, 45);
areaTriangulo("a", 3, 4);
areaTriangulo(5, 6, 8);

/**
 * Apartado 6
 * Crea una función que reciba una cadena con una fecha en formato "YYYY-MM-DD". Muestra la fecha (ej: 2019-02-28) con
 * el siguiente formato: Jueves, 28 de Febrero de 2019.
 * Debes formatear la fecha usando los métodos de la clase Date para obtener, día de la semana, día del mes, mes, y año.
 * No puedes usar librerías como moment.js para ayudarte.
 * Para mostrar el nombre del mes o del día de la semana, puedes crearte un array que los contenga (los días de la semana empiezan por domingo -> 0)
 * Métodos de la clase Date: https://www.w3schools.com/jsref/jsref_obj_date.asp
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 6 -----------------');

function formatearFecha(fecha) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nueva_fecha = new Date(fecha);
    const diaSemana = nueva_fecha.getDay();
    const dia = nueva_fecha.getDate();
    const mes = nueva_fecha.getMonth();
    const anyo = nueva_fecha.getFullYear();

    console.log(`${dias[diaSemana]}, ${dia} de ${meses[mes]} de ${anyo}`)
}

formatearFecha("2025-09-17");
formatearFecha("1992-04-13");
formatearFecha("2020-02-01");