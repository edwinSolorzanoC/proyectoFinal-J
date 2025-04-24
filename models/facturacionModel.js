import pool from '../config/conexion.js'

const facturacionModel = {};

facturacionModel.mostrarDatos = async() => {

     try {
            
            const queryFacturas = `
        
            SELECT idtb_facturas, fechaEmision ,montoCita, montoTotal
            FROM tb_facturas
            `;
    
            const [datosPacientes] = await pool.execute(queryFacturas)
            return datosPacientes;
    
        } catch (error) {
            console.log("ERROR EN EL MODEL MOSTRAR FACTURAS INICIO", error)
        }
}

export default facturacionModel;

