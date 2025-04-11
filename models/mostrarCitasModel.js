// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const mostrarCitasModel = {};

// Función para obtener los ingresos
mostrarCitasModel.obtenerCitasSeleccionadas = async () => {
    const query = `
    SELECT tablaCitas.idtb_citas, tablaCitas.fecha, tablaCitas.hora, tablaCitas.estado,

    tablaPersonaPaciente.primerApellido as apellidoUnoPaciente, tablaPersonaPaciente.segundoApellido as apellidoDosPaciente, tablaPersonaPaciente.primerNombre as nombreUnoPaciente, tablaPersonaPaciente.segundoNombre as nombreDosPaciente,
tablaPersonaPaciente.cedula,
    tablaPersonaMedicos.primerApellido as primerApellidoMedico, tablaPersonaMedicos.segundoApellido as segundoApellidoMedico, tablaPersonaMedicos.primerNombre as primerNombreMedico, tablaPersonaMedicos.segundoNombre as segundoNombreMedico, 
    
    tablaMedicos.especialidad, tablaMedicos.idtb_medicos, tablaPacientes.idtb_pacientes

    FROM tb_citas tablaCitas

    JOIN tb_pacientes tablaPacientes ON tablaCitas.tb_pacientes_idtb_pacientes = tablaPacientes.idtb_pacientes
    JOIN tb_persona tablaPersonaPaciente ON tablaPacientes.tb_persona_idtb_persona = tablaPersonaPaciente.idtb_persona
    JOIN tb_medicos tablaMedicos ON tablaCitas.tb_medicos_idtb_medicos = tablaMedicos.idtb_medicos
    JOIN tb_persona tablaPersonaMedicos ON tablaMedicos.tb_usuarios_tb_persona_idtb_persona = tablaPersonaMedicos.idtb_persona;`; // Asegúrate de que la tabla "ingresos" exista en tu base de datos
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los de citas:", error);
    }
};

export default mostrarCitasModel;

