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
                title: "Nuevo producto registrado exitosamente!",
                showConfirmButton: false,
                timer: 1500
            });
        }else if(successType === "noDisponibilidad"){
        Swal.fire({
            icon: "error",
            title: "Cita no disponible",
            text: "No hay citas disponibles en el horario asignado. Le recomendamos consultar con otro horario",
            showConfirmButton: false,
            timer: 2000
        });
    }else if(successType === "citaDisponible"){
      Swal.fire({
          icon: "success",
          title: "Cita agendada correctamente!",
          text: "La cita se agendó automaticamente",
          showConfirmButton: false,
          timer: 2000
      });
  }
        
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});