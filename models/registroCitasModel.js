import pool from '../config/conexion.js'


const registroCitasModel = {};

registroCitasModel.inicioDatosDoctores = async () => {

    const peticionDatosDoctores = `
    SELECT idtb_medicos, estado, especialidad,primerApellido, segundoApellido,  primerNombre, segundoNombre,  tb_usuarios_idtb_usuarios, tb_usuarios_tb_persona_idtb_persona
    FROM tb_medicos
    JOIN tb_persona
    ON tb_persona.idtb_persona = tb_usuarios_tb_persona_idtb_persona
    WHERE estado = 1;`;

    try {
        const [resultadosMedicos] = await pool.execute(peticionDatosDoctores) 
        return resultadosMedicos
    } catch (error) {
        console.log("error en el model registro citas/peticion doctores")
    }
}

registroCitasModel.registrarCitas = async(
    cedulaPaciente,
    especialidadCita,
    doctorCita,
    fechaCita,
    horaCita,
    estadoCita
) => {

    
    try {
        const peticionDatosDoctores = `
        SELECT idtb_medicos,  tb_usuarios_idtb_usuarios, tb_usuarios_tb_persona_idtb_persona
        FROM tb_medicos
        JOIN tb_persona
        ON tb_persona.idtb_persona = tb_usuarios_tb_persona_idtb_persona
        WHERE idtb_medicos = ?;`;

        const [datosDoctores] = await pool.execute(peticionDatosDoctores, [doctorCita]);


        const idMedico = datosDoctores[0].idtb_medicos;
        const idUsuarioMedico = datosDoctores[0].tb_usuarios_idtb_usuarios;
        const idPersonaMedico = datosDoctores[0].tb_usuarios_tb_persona_idtb_persona;

        const peticionDatosPacientes = `
        SELECT idtb_pacientes, tb_persona_idtb_persona
        FROM tb_pacientes	
        JOIN tb_persona
        ON tb_persona.idtb_persona = tb_persona_idtb_persona
        WHERE cedula = ?;`;

        const [datosPacientes] = await pool.execute(peticionDatosPacientes, [cedulaPaciente])

        const idPaciente = datosPacientes[0].idtb_pacientes;
        const idPersonaPaciente = datosPacientes[0].tb_persona_idtb_persona;
        
        const envioDatosCita = `
        INSERT INTO tb_citas(
        fecha,
        hora,
        estado,
        tb_medicos_idtb_medicos,
        tb_medicos_tb_usuarios_idtb_usuarios,
        tb_medicos_tb_usuarios_tb_persona_idtb_persona,
        tb_pacientes_idtb_pacientes,
        tb_pacientes_tb_persona_idtb_persona
        )VALUE(?, ?, ?, ?, ?, ?, ?, ?);`;

        await pool.execute(envioDatosCita, [
            fechaCita,
            horaCita,
            estadoCita,
            idMedico,
            idUsuarioMedico,
            idPersonaMedico,
            idPaciente,
            idPersonaPaciente
        ])


    } catch (error) {
        console.log("Error en el model de registro de citas")
    }
}




export default registroCitasModel;