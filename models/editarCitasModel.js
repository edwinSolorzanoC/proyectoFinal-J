
// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const editarCitasModel = {};

// Función para obtener los ingresos
editarCitasModel.obtenerCitasSeleccionadas = async (id) => {

    const query = `
        
    SELECT tablaCitas.idtb_citas, tablaCitas.estado, tablaCitas.fecha, tablaCitas.hora,
    tablaPersonaPaciente.primerApellido as apellidoUnoPaciente, tablaPersonaPaciente.segundoApellido as apellidoDosPaciente, tablaPersonaPaciente.primerNombre as nombreUnoPaciente, tablaPersonaPaciente.segundoNombre as nombreDosPaciente,
    tablaPersonaMedicos.primerApellido as primerApellidoMedico, tablaPersonaMedicos.segundoApellido as segundoApellidoMedico, tablaPersonaMedicos.primerNombre as primerNombreMedico, tablaPersonaMedicos.segundoNombre as segundoNombreMedico
    , tablaPersonaPaciente.cedula, tablaMedicos.especialidad
    FROM tb_citas tablaCitas
    JOIN tb_pacientes tablaPacientes ON tablaCitas.tb_pacientes_idtb_pacientes = tablaPacientes.idtb_pacientes
    JOIN tb_persona tablaPersonaPaciente ON tablaPacientes.tb_persona_idtb_persona = tablaPersonaPaciente.idtb_persona
    JOIN tb_medicos tablaMedicos ON tablaCitas.tb_medicos_idtb_medicos = tablaMedicos.idtb_medicos
    JOIN tb_persona tablaPersonaMedicos ON tablaMedicos.tb_usuarios_tb_persona_idtb_persona = tablaPersonaMedicos.idtb_persona 
    WHERE idtb_citas = ?;
    `; 
    
    try {
        const [result] = await pool.execute(query, [id]);  
        return result;  
    } catch (error) {
        console.error("Error al obtener los de citas model editar:", error);
        
    }
};


editarCitasModel.editarCita = async(idCita, fechaCita, horaCita, estadoCita) => {
    
    const queryCita = `
    
    UPDATE tb_citas
    SET fecha = ?, hora = ?, estado = ?
    WHERE idtb_citas = ?;
    `;

    const queryFacturacion = `
    INSERT INTO tb_facturas(
    montoTotal,
    montoCita,
    fechaEmision,
    
    tb_movimientosMedicamentos_idtb_movimientosMedicamentos,
    tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos,
    
    tb_citas_idtb_citas,
    tb_citas_tb_medicos_idtb_medicos,
    tb_citas_tb_medicos_tb_usuarios_idtb_usuarios,
    tb_citas_tb_medicos_tb_usuarios_tb_persona_idtb_persona,
    tb_citas_tb_pacientes_idtb_pacientes,
    tb_citas_tb_pacientes_tb_persona_idtb_persona
    )VALUES(
    10000,
    10000,
    '2025-04-22',
    
    NULL,
    NULL,
    
    7,
    9,
    14,
    37,
    5,
    33
    ); `;
    
    try {
        
        await pool.execute(queryCita, [fechaCita, horaCita, estadoCita, idCita])

    } catch (error) {
        console.log("Error en el model editar citas", error)
    }
}

export default editarCitasModel;


