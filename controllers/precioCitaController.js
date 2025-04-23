

import precioCitaModel from "../models/precioCitaModel.js";

const precioCitaController = {}

precioCitaController.mostrarVista = async (req, res) => {
    const id = req.query.id; // <-- lo sacamos de la URL
  
    try {
      const results = await precioCitaModel.obtenerCitasSeleccionadas(id);
      return res.render('citas/precioCita', { datosPrecioCitas: results });
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
    idPaciente, idPacientePersona, costoCita
  } = req.body;

  const fechaDeHoy = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD
  const costoTotal = costoCita;

  const estadoCita = "ATENDIDA";
  const descripcionIngreso = "INGRESO POR CITA";

  console.log("REQ BODY COMPLETO:", req.body);


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
      descripcionIngreso
    );

    mostrarCitasController.mostrarReportesCitas(req,res);
    
  } catch (error) {
    console.log("Error en el controlador de registrar precios citas", error);
    
  }
}


export default precioCitaController