import pool from "../config/conexion.js";

const registroPacientesModel = {};

registroPacientesModel.enviarDatosBD = async (
    cedulaPaciente,
    primerNombrePaciente,
    segundoNombrePaciente,
    primerApellidoPaciente,
    segundoApellidoPaciente,
    fechaNacimientoPaciente,
    correoElectronicoPaciente,
    direccionPaciente
) => {


    try{

        const queryPersona = `
        INSERT INTO tb_persona (
        cedula,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        fechaNacimiento,
        correoElectronio,
        direccion
        ) VALUE (?,?,?,?,?,?,?,?);`

        const queryPacientes = `
        INSERT INTO tb_pacientes
        (
        estado, 
        tb_persona_idtb_persona)VALUE(
        ?, ?);`

        const [results] = await pool.execute(queryPersona, [
            cedulaPaciente,
            primerNombrePaciente,
            segundoNombrePaciente,
            primerApellidoPaciente,
            segundoApellidoPaciente,
            fechaNacimientoPaciente,
            correoElectronicoPaciente,
            direccionPaciente
        ])

        const idPersona = results.insertId

        await pool.execute(queryPacientes, [
            1, idPersona
        ])

        return results

    }catch(error){
        return res.redirect('/registroPacientes?error=errorRegistrer');
        console.log("Erorr en el model registrar pacientes", error)
    }
}

export default registroPacientesModel;