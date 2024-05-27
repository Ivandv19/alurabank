const botonAbrirCamara = document.querySelector('[data-video-boton]');
const video = document.querySelector('[data-video]');
const campoCamara = document.querySelector('[data-camera]');
const botonTomarFoto = document.querySelector('[data-tomar-foto]');
const mensaje = document.querySelector('[data-mensaje]');
const canvas = document.querySelector('[data-video-canvas]');
let imgUrl = '';
const botonEnviar = document.querySelector('[data-enviar]');

botonAbrirCamara.addEventListener('click', async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
            throw new Error('No se encontraron dispositivos de video.');
        }

        const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        botonAbrirCamara.style.display = 'none';
        campoCamara.style.display = 'block';
        video.srcObject = iniciarVideo;

    } catch (error) {
        console.error('Error al iniciar la cámara:', error);
        alert('No se pudo acceder a la cámara. Por favor, verifica los permisos y que tu dispositivo tenga una cámara disponible.');
    }
});

botonTomarFoto.addEventListener('click', () => {
    try {
        canvas.width = video.videoWidth; // Asegúrate de que el canvas tenga el tamaño adecuado
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        imgUrl = canvas.toDataURL('image/jpeg');
        campoCamara.style.display = 'none';
        mensaje.style.display = 'block';
    } catch (error) {
        console.error('Error al tomar la foto:', error);
    }
});

botonEnviar.addEventListener('click', () => {
    try {
        let recibirDatos = localStorage.getItem('registro');
        if (!recibirDatos) {
            // Inicializar el objeto si no existe en localStorage
            recibirDatos = JSON.stringify({});
            localStorage.setItem('registro', recibirDatos);
        }

        const convertirDatos = JSON.parse(recibirDatos);
        if (!convertirDatos || typeof convertirDatos !== 'object') {
            throw new Error('Datos de registro inválidos.');
        }

        convertirDatos.img_url = imgUrl;
        localStorage.setItem('registro', JSON.stringify(convertirDatos));
        window.location.href = './abrir-cuenta-form-3.html';
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.');
    }
});