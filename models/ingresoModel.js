// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const ingresoModel = {};

// Función para obtener los ingresos
ingresoModel.obtenerIngresosSeleccionados = async () => {
    const query = 'SELECT fecha,descripcion,montoTotal,tb_facturas_idtb_facturas FROM tb_ingersos'; // Asegúrate de que la tabla "ingresos" exista en tu base de datos
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los ingresos:", error);
        
    }
};

export default ingresoModel;
