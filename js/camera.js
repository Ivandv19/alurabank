// Seleccionar elementos del DOM
const botonAbrirCamara = document.querySelector('[data-video-boton]');
const video = document.querySelector('[data-video]');
const campoCamara = document.querySelector('[data-camera]');
const botonTomarFoto = document.querySelector('[data-tomar-foto]');
const mensaje = document.querySelector('[data-mensaje]');
const canvas = document.querySelector('[data-video-canvas]');
let imgUrl = '';
const botonEnviar = document.querySelector('[data-enviar]');

// Evento para abrir la cámara
botonAbrirCamara.addEventListener('click', async () => {
    try {
        // Enumerar los dispositivos de entrada
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // Verificar si hay dispositivos de video disponibles
        if (videoDevices.length === 0) {
            throw new Error('No se encontraron dispositivos de video.');
        }

        // Obtener acceso a la cámara del usuario
        const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Ocultar el botón y mostrar el campo de la cámara
        botonAbrirCamara.style.display = 'none';
        campoCamara.style.display = 'block';
        video.srcObject = iniciarVideo;

    } catch (error) {
        // Manejar errores al acceder a la cámara
        console.error('Error al iniciar la cámara:', error);
        alert('No se pudo acceder a la cámara. Por favor, verifica los permisos y que tu dispositivo tenga una cámara disponible.');
    }
});

// Evento para tomar una foto
botonTomarFoto.addEventListener('click', () => {
    try {
        // Ajustar el tamaño del canvas y capturar la imagen del video
        canvas.width = video.videoWidth; // Asegúrate de que el canvas tenga el tamaño adecuado
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        imgUrl = canvas.toDataURL('image/jpeg');
        // Ocultar el campo de la cámara y mostrar el mensaje
        campoCamara.style.display = 'none';
        mensaje.style.display = 'block';
    } catch (error) {
        // Manejar errores al tomar la foto
        console.error('Error al tomar la foto:', error);
    }
});

// Evento para enviar los datos
botonEnviar.addEventListener('click', () => {
    try {
        // Obtener los datos de registro almacenados en localStorage
        let recibirDatos = localStorage.getItem('registro');
        if (!recibirDatos) {
            // Inicializar el objeto si no existe en localStorage
            recibirDatos = JSON.stringify({});
            localStorage.setItem('registro', recibirDatos);
        }

        // Convertir los datos de registro a objeto JSON
        const convertirDatos = JSON.parse(recibirDatos);
        if (!convertirDatos || typeof convertirDatos !== 'object') {
            throw new Error('Datos de registro inválidos.');
        }

        // Agregar la URL de la imagen al objeto de registro y almacenar en localStorage
        convertirDatos.img_url = imgUrl;
        localStorage.setItem('registro', JSON.stringify(convertirDatos));
        // Redirigir a la siguiente página del formulario
        window.location.href = './abrir-cuenta-form-3.html';
    } catch (error) {
        // Manejar errores al enviar los datos
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.');
    }
});