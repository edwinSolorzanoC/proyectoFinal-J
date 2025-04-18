document.addEventListener('DOMContentLoaded', function () {
  const botonesEditar = document.querySelectorAll('.mostrarEditarCitas');

  botonesEditar.forEach(button => {
      button.addEventListener('click', function () {
          const idCita = this.getAttribute('data-id'); // Obtiene el id desde el atributo 'data-id'

          // Aquí puedes hacer el fetch o redirigir según lo necesites
          window.location.href = `/editarCitasVista?id=${idCita}`;
          
      });
  });




});

