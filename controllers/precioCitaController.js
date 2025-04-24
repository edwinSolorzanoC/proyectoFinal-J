

import precioCitaModel from "../models/precioCitaModel.js";

const precioCitaController = {}

precioCitaController.mostrarVista = async (req, res) => {
    const id = req.query.id; // <-- lo sacamos de la URL
  
    try {
      const { datosPrecioCitas, medicamentos } = await precioCitaModel.obtenerCitasSeleccionadas(id);
      return res.render('citas/precioCita', { datosPrecioCitas: datosPrecioCitas, listaMedicamentos: medicamentos });
      

    } catch (error) {
      console.error("❌ Error en mostrarVista precios:", error);
      res.redirect('/');
    }
};


import mostrarCitasController from "./mostrarCitasController.js";

precioCitaController.insertarCostos = async(req,res) => {
  const {
    idCita,
    idMedico, idMedicoUsuario, idMedicoPersona,
    idPaciente, idPacientePersona, costoCita,
    medicamentos
  } = req.body;

  const fechaDeHoy = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD

  let costoTotal = costoCita;  // Usamos let porque vamos a modificar el valor

  const estadoCita = "ATENDIDA";
  const descripcionIngreso = "INGRESO POR CITA";

  console.log("REQ BODY COMPLETO:", req.body);
  console.log("Costo total calculado:", costoTotal);


  if (medicamentos && medicamentos.length > 0) {
    const [resultadosMedicamentos] = await precioCitaModel.buscarMedicamentos(medicamentos);
    console.log("contorller resultado: ",resultadosMedicamentos)

    console.log(resultadosMedicamentos[0].precioVenta)

    for (let i = 0; i < resultadosMedicamentos.length; i++) {
      costoTotal = parseFloat(costoTotal) + parseFloat(resultadosMedicamentos[i].precioVenta);
      console.log("for: ", costoTotal)
    }
    
    

    console.log("Costo total: ",costoTotal)
  }
  
  try {

    await precioCitaModel.insertarCostos(
      costoTotal,costoCita, fechaDeHoy,

      idCita,
      idMedico,
      idMedicoUsuario,
      idMedicoPersona,
      idPaciente,
      idPacientePersona,

      estadoCita,
      descripcionIngreso,

      medicamentos
    );

    mostrarCitasController.mostrarReportesCitas(req,res);
    
  } catch (error) {
    console.log("Error en el controlador de registrar precios citas", error);
  }
}


export default precioCitaController