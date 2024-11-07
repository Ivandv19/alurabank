// Función principal para validar si una persona es mayor de edad
export default function esMayorDeEdad(campo) {
    // Convierte el valor del campo de fecha a un objeto de tipo Date
    const fechaNacimiento = new Date(campo.value);
    
    // Verifica si la fecha de nacimiento cumple con la mayoría de edad
    if (!validarEdad(fechaNacimiento)) {
        // Establece un mensaje de error personalizado si no es mayor de edad
        campo.setCustomValidity('Necesitas ser mayor de edad');
    }
}

// Función auxiliar para verificar si la fecha cumple con los 18 años
function validarEdad(fecha) {
    const fechaActual = new Date(); // Obtiene la fecha actual
    // Calcula la fecha que corresponde a la fecha de nacimiento más 18 años
    const fechaMas18 = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    // Verifica si la fecha actual es mayor o igual a la fecha calculada
    return fechaActual >= fechaMas18;
}