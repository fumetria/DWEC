'use strict';

/**
 * Apartado 1
 * Crea una función que reciba 2 cadenas por parámetro. Dicha función imprimirá por consola qué cadena
 * tiene mayor longitud. Si el tipo de algún parámetro no es string (typeof param !== "string"),
 * debes imprimir un error.
 * Llama a la función 3 veces con diferentes parámetros. En una de esas llamadas pásale por parámetro un valor que no sea string.
 */

console.log('--------------- APARTADO 1 -----------------');

function cadena_mayor_longitud(cadena1, cadena2) {
    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("ERROR, alguno de los parámetros es inválido.");
        return;
    }
    let long_1 = cadena1.length;
    let long_2 = cadena2.length;
    if (long_1 > long_2) {
        console.log(`La primera cadena(${cadena1}) es mas larga que la segunda cadena(${cadena2})`);
    } else if (long_1 === long_2) {
        console.log("Las dos cadenas tienen la misma longitud.");
    } else {
        console.log(`La segunda cadena(${cadena2}) es mas larga que la primera cadena(${cadena1})`)
    }
}
cadena_mayor_longitud("esdrújula", "llana");
cadena_mayor_longitud("aguda", 20);
cadena_mayor_longitud("yo soy la cadena más larga", "yo soy una cadena aún más larga");

/**
 * Apartado 2
 * Crea una función que reciba 2 números por parámetro, el primer número indicará cuantas veces debemos imprimir el segundo
 * por pantalla, pero en cada iteración muéstra el valor anterior multiplicado por 2.
 * Ejemplo: Si recibimos 4 y 6 imprimiremos: 6 12 24 48
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 2 -----------------');

function multiplicar_numeros_x_veces(parametro1, parametro2) {

    let numeroAMultiplicar = parametro2
    console.log(parametro2);
    for (let index = 1; index < parametro1; index++) {
        const multiplicacion = numeroAMultiplicar * 2;
        console.log(multiplicacion);
        numeroAMultiplicar = multiplicacion;
    }
}
multiplicar_numeros_x_veces(4, 6);
multiplicar_numeros_x_veces(3, 9);
multiplicar_numeros_x_veces(10, 2);
/**
 * Apartado 3
 * Crea una función que reciba 2 parámetros. El primero será una cadena y el segundo otra cadena que contendrá un caracter.
 * Convierte ambos parámetros a cadena y comprueba que efectivamente, el segundo parámetro tiene una longitud de 1.
 * Debes mostrar cuantas veces aparece el caracter recibido en la cadena.
 * Ejemple: Si recibimos "carcasa" y "a", debemos indicar que aparece 3 veces dicha letra en la cadena.
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 3 -----------------');
function mostrar_caracter(cadena1, cadena2) {
    let num_char = 0;

    if (cadena2.length > 1) {
        console.log("El carácter introducido no es válido.");
        return;
    }
    for (let i = 0; i < cadena1.length; i++) {
        const caracter = cadena1[i];
        if (caracter === cadena2) {
            num_char += 1;
        }
    }

    console.log(`El número de veces que aparece el carácter ${cadena2} en la cadena ${cadena1} es de ${num_char}.`);
}

mostrar_caracter("casa", "a");
mostrar_caracter("El murciélago veloz", "l");
mostrar_caracter("Ejercicio bloque 1", "aaa");

/**
 * Apartado 4
 * Crea una función que reciba 3 parámetros (nombre de producto, precio e impuesto en porcentaje sobre 100).
 * Dicha función hará lo siguiente:
 * - Los parámetros deberán tener un valor por defecto por si no los recibe que deben ser: "Producto genérico", 100 y 21.
 * - Convierte el nombre de producto a string (por si acaso) y los otros 2 a número. Si el precio o el impuesto no son
 *   numéros válidos (NaN) muestra un error. Si son válidos, muestra por consola el nombre del producto y el precio final contando impuestos.
 * - Llama a la función varias veces, omitiendo parámetros, con todos los parámetros, y pasándo algún valor no númerico en el precio o impuesto.
 */

console.log('--------------- APARTADO 4 -----------------');

function precioConImpuestos(nombre_producto = "Próducto genérico", precio = 100, tipo_impositivo = 21) {

    let precio_final = 0;
    if (isNaN(Number(precio)) || isNaN(Number(tipo_impositivo))) {
        console.log("Valores no válidos.");
        return
    }
    precio_final = Number(precio) * (1 + (Number(tipo_impositivo) / 100));
    console.log(`${nombre_producto.toString()}: ${precio_final}`);
}

precioConImpuestos("Casa", 5000);
precioConImpuestos("Casa2", 5000, 35);
precioConImpuestos("Valor erroneo", "aaa", 21);
precioConImpuestos();

/**
 * Apartado 5
 * Crea una función de tipo flecha (arrow function) que reciba 2 parámetros. Una cadena completa y un trozo de cadena a buscar.
 * La función debe comprobar si el trozo de cadena de búsqueda se encuentra dentro de la cadena completa e imprimir
 * por consola un mensaje indicando si ha encontrado coincidencia o no.
 * La búsqueda no debe ser sensible a mayúsculas o minúsculas, por lo que debes comparar ambas cadenas previa transformación
 * a minúsculas (o a mayúsculas). Ej: La cadena "Santiago de Compostela" contiene la cadena de búsqueda "COMPO".
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 5 -----------------');

let busquedaTexto = (cadena, textoABuscar) => {
    if ((cadena.toLowerCase()).match(textoABuscar.toLowerCase())) {
        console.log(`La cadena "${cadena}" contiene la cadena de búsqueda "${textoABuscar.toUpperCase()}"`);
        return
    }
    console.log("Texto no encontrado.");
};

busquedaTexto("cadena", "cad");
busquedaTexto("cadena", "xxs");
busquedaTexto("Ejercicio bloque 1", "1")