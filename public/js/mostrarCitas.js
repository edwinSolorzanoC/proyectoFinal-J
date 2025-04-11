
document.addEventListener('DOMContentLoaded', function(){

    const editar = document.getElementById("mostrarEditarCitas");

    editar.addEventListener('click', function(){
        window.location.href = '/editarCitas';

        const fecha = document.getElementById('fechaCita').value;
        console.log(fecha)

        fetch('/editarCitas', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fecha})
        }).then(response => response.json()).then(datos => {
            document.getElementById("fechaCita").textContent = fecha;
        })
    })

})

