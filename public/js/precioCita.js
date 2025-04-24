function agregarMedicamento() {
  const contenedor = document.getElementById('contenedor-medicamentos');
  const plantilla = document.getElementById('plantilla-medicamento');
  
  const nuevoCampo = document.createElement('div');
  nuevoCampo.className = 'medicamento';
  
  // Clonamos el select con todas sus opciones
  const clon = plantilla.cloneNode(true);
  clon.classList.remove('d-none');
  clon.name = 'medicamentos[]'; // importante para enviar varios al backend

  nuevoCampo.appendChild(clon);
  contenedor.appendChild(nuevoCampo);
}
