// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const citasCNModel = {};

// Función para obtener los ingresos
citasCNModel.obtenerCitasSeleccionadas = async () => {
    const query = 'SELECT c.fecha, c.hora,c.tb_pacientes_idtb_pacientes AS id_paciente,u.nombreUsuario AS nombre_medico,m.especialidad, c.estado FROM tb_citas c JOIN tb_medicos m ON c.tb_medicos_idtb_medicos = m.idtb_medicos JOIN tb_usuarios u ON m.tb_usuarios_idtb_usuarios = u.idtb_usuarios WHERE c.estado = 0;'; // Asegúrate de que la tabla "ingresos" exista en tu base de datos
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los de citas:", error);
        
    }
};

export default citasCNModel;