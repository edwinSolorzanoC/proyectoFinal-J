
import registroInventarioModel from '../models/registroInventarioModel.js'

const registroInventarioController = {};


registroInventarioController.registrarInventario = async (req, res) => {
    const estadoProveedor = 1; 
    const {
        nombreProducto,
        descripcionProducto,
        fechaIngresoProducto,
        cantidadProducto,
        precioCompraProducto,
        precioVentaProducto,
        nombreProveedor,
        correoElectronicoProveedor
    } = req.body;

    const tipoMovimiento = "ENTRADA PRODUCTOS";
    const montoMovimiento = cantidadProducto * precioCompraProducto;
    const motivoMovimiento = "COMPRA MEDICAMENTOS";

    let numerofactura = Math.floor(100000 + Math.random() * 900000);
    try{

        const resultados = await registroInventarioModel.registrarInventario(
            nombreProducto,
            descripcionProducto,
            fechaIngresoProducto,
            cantidadProducto,
            precioCompraProducto,
            precioVentaProducto,
            nombreProveedor,
            estadoProveedor,
            correoElectronicoProveedor,

            tipoMovimiento,
            montoMovimiento,
            motivoMovimiento,

            numerofactura
        )

        return res.redirect('/registroInventario?success=newRegister')

    }catch(error){
        console.log("Error en el controller de registrar inventario");
    }


}

export default registroInventarioController;
