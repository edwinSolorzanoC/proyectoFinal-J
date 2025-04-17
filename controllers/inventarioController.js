// controllers/ingresosController.js
import inventarioModel from "../models/inventarioModel.js";

const inventarioController = {};

// Controlador para mostrar el reporte de ingresos
inventarioController.mostrarReportesInventario = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await inventarioModel.obtenerInventarioSeleccionados();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        

        // Asegurarse de que los datos se pasan correctamente
        res.render("inventario/reportesInventario", { datosInventario: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesInventario:", error);
        res.redirect("/");
    }
};

export default inventarioController;
