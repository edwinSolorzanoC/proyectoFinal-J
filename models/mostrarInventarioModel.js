// models/ingresoModel.js
import pool from "../config/conexion.js"; // Asegúrate de que esta ruta sea correcta

const mostrarInventarioModel = {};

// Función para obtener los ingresos
mostrarInventarioModel.obtenerInventario = async () => {
    const query = 'SELECT m.idtb_medicamentos, m.nombre, m.descripcion, m.FechaIngreso, m.cantidad, m.precioCompra, m.precioVenta, p.nombre AS nombre_proveedor FROM tb_medicamentos m JOIN tb_proveedor p ON m.tb_proveedor_idtb_proveedor = p.idtb_proveedor;'; // Asegúrate de que la tabla "ingresos" exista en tu base de datos
    try {
        // Consulta a la base de datos (ajusta el query a tus necesidades)
        
        const [result] = await pool.execute(query);  // Usamos el método execute de mysql2 para obtener los resultados
        return result;  // Retornamos los datos obtenidos
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        
    }
};

export default mostrarInventarioModel;
