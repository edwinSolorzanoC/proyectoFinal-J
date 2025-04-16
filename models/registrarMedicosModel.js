import pool from '../config/conexion.js'

const registrarMedicosModel = {};

registrarMedicosModel.enviarDatos = async (
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
    especialidadMedico,
) => {
    try {
        // 1. Insertar persona
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const [resultPersona] = await pool.execute(queryPersona, [
            cedulaMedico,
            primerNombreMedico,
            segundoNombreMedico,
            primerApellidoMedico,
            segundoApellidoMedico,
            fechaNacimientoMedico,
            correoElectronicoMedico,
            direccionMedico
        ]);

        const idPersona = resultPersona.insertId;

        // 2. Insertar usuario
        const queryUsuario = `
            INSERT INTO tb_usuarios(
                nombreUsuario,
                contrasenna,
                estado,
                rolUsuario,
                tb_persona_idtb_persona
            ) VALUES (?, ?, ?, ?, ?);
        `;

        const [resultUsuario] = await pool.execute(queryUsuario, [
            nombreUsuario,
            contrasennaUsuario,
            estadoUsuario,
            rolUsuario,
            idPersona
        ]);

        const idUsuario = resultUsuario.insertId;

        // 3. Insertar médico
        const queryMedico = `
            INSERT INTO tb_medicos(
                estado,
                especialidad,
                tb_usuarios_idtb_usuarios,
                tb_usuarios_tb_persona_idtb_persona
            ) VALUES (?, ?, ?, ?);
        `;

        await pool.execute(queryMedico, [
            estadoMedico,
            especialidadMedico,
            idUsuario,
            idPersona
        ]);

    } catch (error) {
        console.error("ERROR EN REGISTRAR MEDICOS MODEL:", error);
        
    }
}

export default registrarMedicosModel;
