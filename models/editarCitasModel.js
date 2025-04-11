
// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const editarCitasModel = {};

// Función para obtener los ingresos
editarCitasModel.obtenerCitasSeleccionadas = async (id) => {

    const query = `
    
SELECT tablaCitas.estado, tablaCitas.fecha, tablaCitas.hora,
tablaPersonaPaciente.primerApellido as apellidoUnoPaciente, tablaPersonaPaciente.segundoApellido as apellidoDosPaciente, tablaPersonaPaciente.primerNombre as nombreUnoPaciente, tablaPersonaPaciente.segundoNombre as nombreDosPaciente,
tablaPersonaMedicos.primerApellido as primerApellidoMedico, tablaPersonaMedicos.segundoApellido as segundoApellidoMedico, tablaPersonaMedicos.primerNombre as primerNombreMedico, tablaPersonaMedicos.segundoNombre as segundoNombreMedico
, tablaPersonaPaciente.cedula, tablaMedicos.especialidad
FROM tb_citas tablaCitas
JOIN tb_pacientes tablaPacientes ON tablaCitas.tb_pacientes_idtb_pacientes = tablaPacientes.idtb_pacientes
JOIN tb_persona tablaPersonaPaciente ON tablaPacientes.tb_persona_idtb_persona = tablaPersonaPaciente.idtb_persona
JOIN tb_medicos tablaMedicos ON tablaCitas.tb_medicos_idtb_medicos = tablaMedicos.idtb_medicos
JOIN tb_persona tablaPersonaMedicos ON tablaMedicos.tb_usuarios_tb_persona_idtb_persona = tablaPersonaMedicos.idtb_persona 
WHERE idtb_citas = ?;
    `; // Asegúrate de que la tabla "ingresos" exista en tu base de datos
    
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query, [id]);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los de citas model editar:", error);
        
    }
};

export default editarCitasModel;


