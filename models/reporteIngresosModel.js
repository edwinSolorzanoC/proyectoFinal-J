
import pool from "../config/conexion.js";

const reporteIngresosModel = {};

reporteIngresosModel.consultaDatosIngresos = async () => {
 
    const peticionDatosIngresos = `SELECT fecha, descripcion, montoTotal, tb_facturas_idtb_facturas
    FROM tb_ingersos;`

    try{
        const [resultados] = await pool.execute(peticionDatosIngresos);
        return {resultados};
    }catch(error){
        console.log("Error en el modelo reporte ingresos")
    }
}

export default reporteIngresosModel;