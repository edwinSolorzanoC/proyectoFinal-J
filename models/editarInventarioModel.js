import pool from '../config/conexion.js'

const editarInventarioModel = {}

editarInventarioModel.obtenerInventario = async(id) => {

    const query = `
    SELECT idtb_medicamentos,nombre, descripcion, fechaIngreso, cantidad, precioCompra, precioVenta  
    FROM tb_medicamentos 
    WHERE idtb_medicamentos = ?;
    `;


    try {
        const [resultados] = await pool.execute(query, [id])
        return resultados;

    } catch (error) {
        console.log("Error en el model de inventario editar")
    }

}


editarInventarioModel.editarInventario = async(idMedicamento, cantidad, fechaActual) => {

    const query = `
    
    UPDATE tb_medicamentos
    SET cantidad = cantidad + ?, fechaIngreso = ?
    WHERE idtb_medicamentos = ?;

    `;


    try {
        await pool.execute(query, [cantidad, fechaActual, idMedicamento])

    } catch (error) {
        console.log("Error en el model de inventario editar", error)
    }
}

export default editarInventarioModel