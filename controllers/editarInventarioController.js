
const editarInventarioController = {};

import editarInventarioModel from "../models/editarInventarioModel.js";

editarInventarioController.mostrarVista = async (req, res) => {
    const id = req.query.id; // <-- lo sacamos de la URL
    
    try {
        const [producto] = await editarInventarioModel.obtenerInventario(id);
        res.render('inventario/editarInventario', {producto: producto})

    } catch (error) {

    }
    
};

editarInventarioController.editarProducto = async(req, res) => {
    const {idMedicamento, cantidad} = req.body;
    // Crear la fecha actual
    const today = new Date();
    const fechaActual = today.toISOString().slice(0, 10);


    try {
        await editarInventarioModel.editarInventario(idMedicamento, cantidad, fechaActual)
        res.redirect('mostrarInventario')

    } catch (error) {
        console.log("Error en contorller editar producto", error)
    }
}

export default editarInventarioController;