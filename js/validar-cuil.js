// Función para validar un CUIL (número de identificación en Argentina)
export default function esUnCuil(campo) {
  // Quita guiones y barras para obtener sólo los dígitos
  const cuil = campo.value.replace(/[-\/]/g, "");

  // Verifica si el CUIL tiene todos los números repetidos
  if (tieneNumerosRepetidos(cuil)) {
    console.log("Valores repetidos");
    campo.setCustomValidity("Valores repetidos"); // Asigna un mensaje de error si es repetido
  } else {
    // Valida los primeros dígitos y el dígito verificador del CUIL
    if (validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)) {
      console.log("CUIL válido"); // Indica en la consola que el CUIL es válido
    } else {
      console.log("El CUIL no es válido");
      campo.setCustomValidity("El CUIL no es válido"); // Asigna un mensaje de error si es inválido
    }
  }
}

// Función para verificar si el CUIL tiene números repetidos
function tieneNumerosRepetidos(cuil) {
  // Lista de CUILs inválidos por tener todos los mismos números
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  // Devuelve true si el CUIL coincide con alguno de los inválidos
  return numerosRepetidos.includes(cuil);
}

// Función para validar los primeros dígitos del CUIL
function validarPrimerosDigitos(cuil) {
  // Obtiene los primeros dos dígitos del CUIL
  let primerosDigitos = cuil.substr(0, 2);
  // Lista de combinaciones válidas de los primeros dígitos
  let digitosValidos = ["20", "23", "24", "27", "30", "33", "34"];
  // Devuelve true si los primeros dígitos están en la lista de válidos
  return digitosValidos.includes(primerosDigitos);
}

// Función para validar el dígito verificador del CUIL
function validarDigitoVerificador(cuil) {
  let acumulado = 0;
  // Factores para multiplicar cada dígito del CUIL (excepto el último)
  const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  // Calcula el valor acumulado multiplicando cada dígito por su factor correspondiente
  for (let i = 0; i < 10; i++) {
    acumulado += parseInt(cuil[i], 10) * factores[i];
  }

  // Calcula el dígito verificador teórico a partir del acumulado
  let validadorTeorico = 11 - (acumulado % 11);
  if (validadorTeorico === 11) {
    validadorTeorico = 0; // Si el resultado es 11, se ajusta a 0
  } else if (validadorTeorico === 10) {
    validadorTeorico = 9; // Si el resultado es 10, se ajusta a 9
  }

  // Obtiene el último dígito del CUIL, que es el dígito verificador real
  const digitoVerificador = parseInt(cuil[10], 10);

  // Verifica si el dígito verificador calculado coincide con el real
  return digitoVerificador === validadorTeorico;
}
