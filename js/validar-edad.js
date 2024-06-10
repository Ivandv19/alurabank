// Función para validar si una persona es mayor de edad
export default function esMayorDeEdad(campo) {
    const fechaNacimiento = new Date(campo.value);
    
    // Verificar si la fecha de nacimiento cumple con la mayoría de edad
    if (!validarEdad(fechaNacimiento)){
        campo.setCustomValidity('Necesitas ser mayor de edad');
    }
}

// Función para validar si la fecha de nacimiento cumple con la mayoría de edad
function validarEdad(fecha) {
    const fechaActual = new Date();
    const fechaMas18 = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return fechaActual >= fechaMas18;
}