// Función para validar un CUIL
export default function esUnCuil(campo) {
    const cuil = campo.value.replace(/[-\/]/g, '');

    // Verificar si el CUIL tiene números repetidos
    if (tieneNumerosRepetidos(cuil)) {
        console.log('Valores repetidos');
        campo.setCustomValidity('Valores repetidos');
    } else {
        // Validar los primeros dígitos y el dígito verificador del CUIL
        if (validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)) {
            console.log('CUIL válido');
        } else {
            console.log('El CUIL no es válido');
            campo.setCustomValidity('El CUIL no es válido');
        }
    }
}

// Función para verificar si el CUIL tiene números repetidos
function tieneNumerosRepetidos(cuil) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ];

    return numerosRepetidos.includes(cuil);
}

// Función para validar los primeros dígitos del CUIL
function validarPrimerosDigitos(cuil) {
    let primerosDigitos = cuil.substr(0, 2);
    let digitosValidos = ['20', '23', '24', '27', '30', '33', '34'];
    return digitosValidos.includes(primerosDigitos);
}

// Función para validar el dígito verificador del CUIL
function validarDigitoVerificador(cuil) {
    let acumulado = 0;
    const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    // Calcular el acumulado
    for (let i = 0; i < 10; i++) {
        acumulado += parseInt(cuil[i], 10) * factores[i];
    }

    // Calcular el dígito verificador teórico
    let validadorTeorico = 11 - (acumulado % 11);
    if (validadorTeorico === 11) {
        validadorTeorico = 0;
    } else if (validadorTeorico === 10) {
        validadorTeorico = 9;
    }

    // Obtener el dígito verificador del CUIL
    const digitoVerificador = parseInt(cuil[10], 10);
    
    // Verificar si el dígito verificador coincide con el teórico
    return digitoVerificador === validadorTeorico;
}