import pool from '../config/conexion.js'

const registroInventarioModel = {};

registroInventarioModel.registrarInventario = async(
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
) => {

    try{

        const fechaConvertida = convertirFecha(fechaIngresoProducto);

        const envioProveedor = `
        INSERT INTO tb_proveedor (
        nombre,
        estado,
        correoElectronico
        ) VALUE(?,?,?);`;

        const [proveedorResult] = await pool.execute(envioProveedor, [
            nombreProveedor,
            estadoProveedor,
            correoElectronicoProveedor
        ]);

        const idProveedor = proveedorResult.insertId; // Obtener el ID del proveedor

        const envioProductos = `
        INSERT INTO tb_medicamentos(
        nombre,
        descripcion,
        fechaIngreso,
        cantidad,
        precioCompra,
        precioVenta,
        tb_proveedor_idtb_proveedor
        ) VALUE (?, ?, ?, ?, ?, ?, ?);`;


        const [productosResult] = await pool.execute(envioProductos, [
            nombreProducto,
            descripcionProducto,
            fechaConvertida,
            cantidadProducto,
            precioCompraProducto,
            precioVentaProducto,
            idProveedor
        ]);

        const idProducto = productosResult.insertId; // Obtener el ID del proveedor


        
        const envioMovimiento =  ` 
        INSERT INTO tb_movimientosmedicamentos(
        tipoMovimiento,
        cantidad,
        fechaMovimiento,
        montoMovimiento,
        motivo,
        tb_medicamentos_idtb_medicamentos
        )VALUES(?,?,?,?,?,?);`;

        const [movimientoResults] = await pool.execute(envioMovimiento, [tipoMovimiento, cantidadProducto, fechaConvertida, montoMovimiento, motivoMovimiento, idProducto])

        const idMovimiento = movimientoResults.insertId;

        const envioEgreso =  ` 
        INSERT INTO tb_egresos(
        fecha,
        descripcion,
        montoTotal,
        numerofactura,
        tb_movimientosMedicamentos_idtb_movimientosMedicamentos,
        tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos
        )VALUES(?,?,?,?,?,?);`;

        await pool.execute(envioEgreso, [fechaConvertida, nombreProducto, montoMovimiento, numerofactura, idMovimiento, idProducto])

    }catch(error){
        console.log("Error en el modelo de registrar inventario", error)
    }
}

const convertirFecha = (fecha) => {
    const partes = fecha.split('/'); // Divide "DD/MM/YYYY"
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`; // Retorna "YYYY-MM-DD"
    }
    return fecha; // Si ya está en el formato correcto, no la cambia
};

export default registroInventarioModel;