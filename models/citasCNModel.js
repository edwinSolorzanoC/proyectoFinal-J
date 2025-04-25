// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const citasCNModel = {};

// Función para obtener los ingresos
citasCNModel.obtenerCitasSeleccionadas = async () => {
    const query = `
SELECT 
    c.fecha, 
    c.hora, 
    p.primerNombre AS primerNombre_paciente, 
    p.segundoNombre AS segundoNombre_paciente, 
    p.primerApellido AS primerApellido_paciente, 
    p.segundoApellido AS segundoApellido_paciente,
    pm.primerNombre AS primerNombre_medico, 
    pm.segundoNombre AS segundoNombre_medico, 
    pm.primerApellido AS primerApellido_medico, 
    pm.segundoApellido AS segundoApellido_medico, 
    m.especialidad, 
    c.estado 
FROM 
    tb_citas c 
JOIN 
    tb_medicos m 
    ON c.tb_medicos_idtb_medicos = m.idtb_medicos 
JOIN 
    tb_usuarios u 
    ON m.tb_usuarios_idtb_usuarios = u.idtb_usuarios 
JOIN 
    tb_persona p 
    ON c.tb_pacientes_tb_persona_idtb_persona = p.idtb_persona 
JOIN 
    tb_persona pm 
    ON m.tb_usuarios_tb_persona_idtb_persona = pm.idtb_persona 
WHERE 
    c.estado = "CANCELADA";

    
    `
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los de citas:", error);
        
    }
};

export default citasCNModel;