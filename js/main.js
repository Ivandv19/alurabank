// Importación de funciones de validación y variables personalizadas
import esUnCuil from "./validar-cuil.js"; // Función para validar el CUIL (número de identificación en Argentina)
import esMayorDeEdad from "./validar-edad.js"; // Función para verificar si el usuario es mayor de edad
import { tiposError, mensajes } from "./customErrors.js"; // Tipos de error y mensajes personalizados para cada campo

// Selección de elementos del formulario
const campoDeFormulario = document.querySelectorAll("[required]"); // Todos los campos que son obligatorios
const formulario = document.querySelector("[data-formulario]"); // Formulario principal

// Evento de envío del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene el envío predeterminado del formulario

  // Almacenamiento de respuestas del formulario en localStorage
  const listaRespuestas = {
    nombre: e.target.elements["nombre"].value,
    email: e.target.elements["email"].value,
    identificacion: e.target.elements["identificacion"].value,
    cuild: e.target.elements["cuild"].value,
    fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,
  };
  localStorage.setItem("registro", JSON.stringify(listaRespuestas)); // Guarda los datos en localStorage
  window.location.href = "./abrir-cuenta-form-2.html"; // Redirige a la siguiente página del formulario
});

// Evento blur para verificar cada campo del formulario
campoDeFormulario.forEach((campo) => {
  // Verifica el campo al salir (evento blur)
  campo.addEventListener("blur", () => verificarCampo(campo));
  // Previene la validación automática del navegador
  campo.addEventListener("Invalid", (evento) => evento.preventDefault());
});

// Función para verificar y mostrar mensajes de error en los campos del formulario
function verificarCampo(campo) {
  let mensaje = "";
  campo.setCustomValidity(""); // Limpia cualquier mensaje de error previo

  // Validación específica para el campo de CUIL
  if (campo.name == "cuil" && campo.value.length >= 11) {
    esUnCuil(campo); // Llama a la función de validación de CUIL si el campo es adecuado
  }

  // Validación específica para el campo de fecha de nacimiento
  if (campo.name == "fecha_nacimiento" && campo.value != "") {
    esMayorDeEdad(campo); // Llama a la función de validación de edad si la fecha de nacimiento está presente
  }

  // Iteración sobre los tipos de error y asignación de mensajes
  tiposError.forEach((error) => {
    if (campo.validity[error]) {
      // Si el campo tiene un tipo de error específico
      mensaje = mensajes[campo.name][error]; // Asigna el mensaje correspondiente
      console.log(mensaje); // Muestra el mensaje de error en la consola (para depuración)
    }
  });

  // Mostrar mensaje de error en el campo del formulario
  const mensajeError = campo.parentNode.querySelector(".mensaje-error"); // Elemento para mostrar el error
  const validarInputCheck = campo.checkValidity(); // Valida el campo en su estado actual
  if (!validarInputCheck) {
    mensajeError.textContent = mensaje; // Muestra el mensaje si el campo no es válido
  } else {
    mensajeError.textContent = ""; // Limpia el mensaje de error si el campo es válido
  }
}
