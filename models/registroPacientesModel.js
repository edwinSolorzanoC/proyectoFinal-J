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

        const query = `
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

        const [results] = await pool.execute(query, [
            cedulaPaciente,
            primerNombrePaciente,
            segundoNombrePaciente,
            primerApellidoPaciente,
            segundoApellidoPaciente,
            fechaNacimientoPaciente,
            correoElectronicoPaciente,
            direccionPaciente
        ])
        return results

    }catch(error){
        console.log("Erorr en el model registrar pacientes")
    }
}

export default registroPacientesModel;