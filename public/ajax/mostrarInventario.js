document.addEventListener('DOMContentLoaded', function () {
     const editar = document.querySelectorAll('.mostrarEditarInventario');
  
  
    editar.forEach(button => {
        button.addEventListener('click', function(){
            const idInventario = this.getAttribute('data-id');
            console.log("Hoola id inventario: ", idInventario)
            window.location.href = `/mostrarEditarInventario?id=${idInventario}`;
        })
    })
    
  });
  
  