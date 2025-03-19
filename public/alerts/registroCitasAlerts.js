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
                title: "¡Cita Registrada Exitosamente!",
                showConfirmButton: false,
                timer: 1500
            });
        }else if(successType === "siHayEspacio"){

            Swal.fire({
                title: "¡Espacio disponible!",
                text: "Deseas confirmar la cita !?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Cita Confirmada!",
                    text: "La cita fue registrada exitosamente",
                    icon: "success"
                  });
                  window.location.href = "/registrarCita";
                }else if (result.isDenied) {
                    Swal.fire({
                        title: "Se cancelo cita!",
                        text: "La cita fue cancelada",
                        icon: "warning"
                      });
                }
              });

        }

        
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});