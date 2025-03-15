document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("error")) {
        const errorType = urlParams.get("error");

        if (errorType === "userNotFound") {
            Swal.fire({
                icon: "error",
                title: "Datos Incorrecto",
                text: "Usuario y/o contraseña incorrectos",
            });
        }
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});