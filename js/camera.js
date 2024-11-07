// Seleccionar elementos del DOM
const botonAbrirCamara = document.querySelector("[data-video-boton]"); // Botón para abrir la cámara
const video = document.querySelector("[data-video]"); // Elemento de video para mostrar la cámara en tiempo real
const campoCamara = document.querySelector("[data-camera]"); // Contenedor de la cámara
const botonTomarFoto = document.querySelector("[data-tomar-foto]"); // Botón para tomar la foto
const mensaje = document.querySelector("[data-mensaje]"); // Elemento para mostrar un mensaje después de tomar la foto
const canvas = document.querySelector("[data-video-canvas]"); // Canvas para capturar y mostrar la foto tomada
let imgUrl = ""; // Variable para almacenar la URL de la imagen capturada
const botonEnviar = document.querySelector("[data-enviar]"); // Botón para enviar los datos

// Evento para abrir la cámara
botonAbrirCamara.addEventListener("click", async () => {
  try {
    // Enumerar los dispositivos de entrada y filtrar los dispositivos de video
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    // Verificar si hay dispositivos de video disponibles
    if (videoDevices.length === 0) {
      throw new Error("No se encontraron dispositivos de video.");
    }

    // Obtener acceso a la cámara del usuario (solo video, sin audio)
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    // Ocultar el botón de abrir cámara y mostrar el campo de la cámara
    botonAbrirCamara.style.display = "none";
    campoCamara.style.display = "block";
    video.srcObject = iniciarVideo; // Mostrar la transmisión en el elemento de video
  } catch (error) {
    // Manejar errores al acceder a la cámara
    console.error("Error al iniciar la cámara:", error);
    alert(
      "No se pudo acceder a la cámara. Por favor, verifica los permisos y que tu dispositivo tenga una cámara disponible."
    );
  }
});

// Evento para tomar una foto
botonTomarFoto.addEventListener("click", () => {
  try {
    // Ajustar el tamaño del canvas al tamaño del video y capturar la imagen
    canvas.width = video.videoWidth; // Asignar el ancho del video al canvas
    canvas.height = video.videoHeight; // Asignar la altura del video al canvas
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height); // Dibujar la imagen en el canvas
    imgUrl = canvas.toDataURL("image/jpeg"); // Convertir la imagen del canvas a URL en formato JPEG

    // Ocultar el campo de la cámara y mostrar el mensaje de confirmación
    campoCamara.style.display = "none";
    mensaje.style.display = "block";
  } catch (error) {
    // Manejar errores al tomar la foto
    console.error("Error al tomar la foto:", error);
  }
});

// Evento para enviar los datos
botonEnviar.addEventListener("click", () => {
  try {
    // Obtener los datos de registro almacenados en localStorage
    let recibirDatos = localStorage.getItem("registro");
    if (!recibirDatos) {
      // Si no existe, inicializar el objeto vacío en localStorage
      recibirDatos = JSON.stringify({});
      localStorage.setItem("registro", recibirDatos);
    }

    // Convertir los datos de registro de JSON a objeto
    const convertirDatos = JSON.parse(recibirDatos);
    if (!convertirDatos || typeof convertirDatos !== "object") {
      throw new Error("Datos de registro inválidos.");
    }

    // Agregar la URL de la imagen capturada al objeto de registro y almacenar en localStorage
    convertirDatos.img_url = imgUrl;
    localStorage.setItem("registro", JSON.stringify(convertirDatos));

    // Redirigir a la siguiente página del formulario
    window.location.href = "./abrir-cuenta-form-3.html";
  } catch (error) {
    // Manejar errores al enviar los datos
    console.error("Error al enviar los datos:", error);
    alert(
      "Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo."
    );
  }
});
