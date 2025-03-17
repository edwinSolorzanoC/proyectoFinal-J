

import registroPacientesModel from "../models/registroPacientesModel.js";

const registroPacientesController = {}; 

registroPacientesController.registrarPaciente = async (req, res) => {
    
    const {
        cedulaPaciente,
        primerNombrePaciente,
        segundoNombrePaciente,
        primerApellidoPaciente,
        segundoApellidoPaciente,
        fechaNacimientoPaciente,
        correoElectronicoPaciente,
        direccionPaciente
    } = req.body;

    try{

        const resultado = await registroPacientesModel.enviarDatosBD(
            cedulaPaciente,
            primerNombrePaciente,
            segundoNombrePaciente,
            primerApellidoPaciente,
            segundoApellidoPaciente,
            fechaNacimientoPaciente,
            correoElectronicoPaciente,
            direccionPaciente
        );

        return res.redirect('/registroPacientes?success=newRegister')
    }catch(error){
        console.log("Error en el controller registrar pacientes")
    }
}

export default registroPacientesController;