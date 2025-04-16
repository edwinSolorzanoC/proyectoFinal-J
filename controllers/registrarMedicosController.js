
import registrarMedicosModel from "../models/registrarMedicosModel.js";

const registrarMedicosController = {}

registrarMedicosController.nueviMedico = async(req,res) => {
    
    const {
        cedulaMedico,
        primerNombreMedico,
        segundoNombreMedico,
        primerApellidoMedico,
        segundoApellidoMedico,
        especialidadMedico,
        fechaNacimientoMedico,
        correoElectronicoMedico,
        direccionMedico
    } = req.body;

    const nombreUsuario = cedulaMedico;
    const contrasennaUsuario = cedulaMedico.toString();
    const estadoUsuario = 1;
    const rolUsuario = "MEDICO";

    const estadoMedico = 1;
    
    await registrarMedicosModel.enviarDatos(
        cedulaMedico,
        primerNombreMedico,
        segundoNombreMedico,
        primerApellidoMedico,
        segundoApellidoMedico,
        fechaNacimientoMedico,
        correoElectronicoMedico,
        direccionMedico,

        nombreUsuario,
        contrasennaUsuario,
        estadoUsuario,
        rolUsuario,

        estadoMedico,
        especialidadMedico
    );

    res.redirect('/administracion/registrarMedicos?success=newRegister')

    try {
        
    } catch (error) {
        console.log("EEROR EN REGISTRAR MEDICOS CONTROLLER", error)
        return res.redirect('/administracion/registrarMedicos?error=errorRegister');
    }
}

export default registrarMedicosController;