
import pool from '../config/conexion.js'

const mostrarPacientesModel = {};

mostrarPacientesModel.peticionInicio = async(

) => {

    try {
        
        const queryPacientes = `
    
        SELECT tb_persona.cedula, tb_persona.primerNombre, tb_persona.segundoNombre, tb_persona.primerApellido,
        tb_persona.segundoApellido, tb_persona.fechaNacimiento, tb_persona.correoElectronio, tb_persona.direccion
        FROM tb_pacientes
        JOIN tb_persona ON tb_pacientes.tb_persona_idtb_persona = tb_persona.idtb_persona
        ;`;

        const [datosPacientes] = await pool.execute(queryPacientes)
        return datosPacientes;

    } catch (error) {
        console.log("ERROR EN EL MODEL MOSTRAR PACINETES INICIO", error)
    }
}

export default mostrarPacientesModel;