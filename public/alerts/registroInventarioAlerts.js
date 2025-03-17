document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("error")) {
        const errorType = urlParams.get("error");

        
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if(successType === "newRegister"){
            Swal.fire({
                icon: "success",
                title: "¡Paciente registrado exitosamente!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});