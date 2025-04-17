// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const mostrarEgresosModel = {};

// Función para obtener los ingresos
mostrarEgresosModel.obtenerEgresos = async () => {
    const query = `
    
    SELECT tablaEgresos.fecha,tablaEgresos.montoTotal, tablaEgresos.numerofactura, tablaMovimientos.motivo
    FROM tb_egresos tablaEgresos
    JOIN tb_movimientosmedicamentos tablaMovimientos ON tablaEgresos.tb_movimientosMedicamentos_idtb_movimientosMedicamentos = tablaMovimientos.idtb_movimientosMedicamentos
    ;
    `;
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los egresos:", error);
        
    }
};

export default mostrarEgresosModel;
