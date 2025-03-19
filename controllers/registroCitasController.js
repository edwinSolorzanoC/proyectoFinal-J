

import registroCitasModel from "../models/registroCitasModel.js";

const registroCitasController = {};


registroCitasController.mostrarDatosMedicos = async (req, res) => {
    try {
        const resultados = await registroCitasModel.inicioDatosDoctores();
        res.render('gestionarCitas', {datosMedicos: resultados})
    } catch (error) {
        console.log("Error en el controller mostrar datos medicos")
    }
}

registroCitasController.registrarNuevaCita = async (req, res) => {

    const {
        cedulaPaciente,
        especialidadCita,
        doctorCita,
        fechaCita,
        horaCita
    } = req.body;

    const estadoCita = 1;
    try {
        
        await registroCitasModel.registrarCitas(
            cedulaPaciente,
            especialidadCita,
            doctorCita,
            fechaCita,
            horaCita,
            estadoCita
        );
        return res.redirect('/gestionarCitas?success=newRegister')

    } catch (error) {
        console.log("Error en el controlador registrar Citas")
    }
}

export default registroCitasController;
