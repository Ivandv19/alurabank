// Importación de funciones de validación y variables personalizadas
import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from './customErrors.js';

// Selección de elementos del formulario
const campoDeFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

// Evento de envío del formulario
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    // Almacenamiento de respuestas del formulario en localStorage
    const listaRespuestas = {
        nombre: e.target.elements['nombre'].value,
        email: e.target.elements['email'].value,
        identificacion: e.target.elements['identificacion'].value,
        cuild: e.target.elements['cuild'].value,
        fecha_nacimiento: e.target.elements['fecha_nacimiento'].value,
    }
    localStorage.setItem('registro', JSON.stringify(listaRespuestas));
    window.location.href = './abrir-cuenta-form-2.html';
})

// Evento blur para verificar cada campo del formulario
campoDeFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificarCampo(campo))
    campo.addEventListener('Invalid', evento => evento.preventDefault())
});

// Función para verificar y mostrar mensajes de error en los campos del formulario
function verificarCampo(campo) {
    let mensaje = '';
    campo.setCustomValidity('');

    // Validación específica para el campo de CUIL
    if (campo.name == 'cuil' && campo.value.length >= 11) {
        esUnCuil(campo);
    }

    // Validación específica para el campo de fecha de nacimiento
    if (campo.name == 'fecha_nacimiento' && campo.value != '') {
        esMayorDeEdad(campo);
    }

    // Iteración sobre los tipos de error y asignación de mensajes
    tiposError.forEach(error => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error]
            console.log(mensaje); // Muestra el mensaje de error en la consola (para fines de depuración)
        }
    })

    // Mostrar mensaje de error en el campo del formulario
    const mensajeError = campo.parentNode.querySelector('.mensaje-error');
    const validarInputCheck = campo.checkValidity();
    if (!validarInputCheck){
        mensajeError.textContent = mensaje
    } else {
        mensajeError.textContent = '';
    }
}