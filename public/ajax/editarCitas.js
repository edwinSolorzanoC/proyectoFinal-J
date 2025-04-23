document.addEventListener('DOMContentLoaded', function(){
    
    const finalizar = document.getElementById("finalizarCita");

    finalizar.addEventListener('click', function(){
        const idCita = this.getAttribute('data-id'); // Obtiene el id desde el atributo 'data-id'
        console.log("id cita: ", idCita);

        window.location.href = `/precioCita?id=${idCita}`
    })
});

