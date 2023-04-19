// Espera a que se cargue el DOM antes de ejecutar la función
$(function () {
    // Selección de elementos del DOM
    const content = $("#content");
    const beforeContainer = $("#before-container");
    const afterContainer = $("#after-container");
    const revealBar = $("#reveal-bar");
    // Establecer las imágenes de fondo de los contenedores
    beforeContainer.css("background-image", 'url("./assets/images/faces/pexels-daniel-xavier-1.jpg")');
    afterContainer.css("background-image", 'url("./assets/images/faces/pexels-daniel-xavier-2.jpg")');
    // Crear una nueva instancia de Hammer.js en el elemento content
    const hammer = new Hammer(content[0]);
    let distance = 0;
    // Configurar el gesto de desplazamiento (pan) para que funcione en dirección horizontal
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    // Evento que se activa cuando comienza el desplazamiento (pan)
    hammer.on("panstart", function (event) {
        // Guardar la posición inicial de la barra de revelado
        distance = parseFloat(revealBar.css("left"));
    });
    // Evento que se activa cuando el usuario está moviendo el dedo o el cursor durante el desplazamiento
    hammer.on("panmove", function (event) {
        // Calcular la posición actual de la barra de revelado
        const currentPosition = distance + event.deltaX;
        // Asegurar que la posición de la barra de revelado no se salga del área del contenido
        let newPosition = currentPosition < 0 ? 0 : currentPosition;
        newPosition = newPosition > content.width() - revealBar.width() ? content.width() - revealBar.width() : newPosition;
        // Actualizar la posición de la barra de revelado y el ancho del contenedor afterContainer
        afterContainer.css("width", newPosition + "px");
        revealBar.css("left", newPosition + "px");
    });
    // Evento que se activa cuando el usuario termina el desplazamiento
    hammer.on("panend", function (event) {
        // Guardar la posición final de la barra de revelado
        distance = parseFloat(revealBar.css("left"));
    });
});