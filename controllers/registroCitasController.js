

import registroCitasModel from "../models/registroCitasModel.js";

const registroCitasController = {};


registroCitasController.mostrarDatosMedicos = async (req, res) => {
    try {
        const resultados = await registroCitasModel.inicioDatosDoctores();
        res.render('citas/gestionarCitas', {datosMedicos: resultados})
    } catch (error) {
        console.log("Error en el controller mostrar datos medicos")
    }
}
registroCitasController.consultaCitas = async(req,res) => {

    const {
        cedulaPaciente,
        especialidadCita,
        doctorCita,
        fechaCita,
        horaCita

    } = req.body; 

    try {
        
        const resultadosDisponibilidad = await registroCitasModel.consultarDisponibilidadCita(
            cedulaPaciente,
            especialidadCita,
            doctorCita,
            fechaCita,
            horaCita
        )

        if(resultadosDisponibilidad.length > 0){
            return res.redirect('gestionarCitas?success=noDisponibilidad');
        }else{
            await registroCitasController.registrarNuevaCita(cedulaPaciente,
                especialidadCita,
                doctorCita,
                fechaCita,
                horaCita);
            return res.redirect('gestionarCitas?success=citaDisponible');
        }
    } catch (error) {
        console.log("Error en el controller de consultar cita",  error)
    }
};


registroCitasController.registrarNuevaCita = async (cedulaPaciente,
    especialidadCita,
    doctorCita,
    fechaCita,
    horaCita) => {
    const estadoCita = "PENDIENTE";
    try {
        await registroCitasModel.registrarCitas(
            cedulaPaciente,
            especialidadCita,
            doctorCita,
            fechaCita,
            horaCita,
            estadoCita
        );
    } catch (error) {
        console.log("Error en el controlador registrar Citas", error);
    }
};

export default registroCitasController;
