// controllers/ingresosController.js
import inventarioBModel from "../models/inventarioBModel.js";

const inventarioBController = {};

// Controlador para mostrar el reporte de ingresos
inventarioBController.mostrarReportesInventario = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await inventarioBModel.obtenerInventarioSeleccionados();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        

        // Asegurarse de que los datos se pasan correctamente
        res.render("inventario/reporteProductosStock", { datosInventario: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesInventario:", error);
        res.redirect("/");
    }
};

export default inventarioBController;
