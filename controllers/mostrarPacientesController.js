
import mostrarPacientesModel from "../models/mostrarPacienteModel.js";

const mostrarPacienteController = {};

mostrarPacienteController.inicio = async (req, res) => {

    
    try {
        const results = await mostrarPacientesModel.peticionInicio();
        res.render("pacientes/mostrarPacientes", { datosPacientes: results });

    } catch (error) {
        console.log("Error en el contorller mostrar pacienets inicio", error)
    }
   
}
export default mostrarPacienteController;