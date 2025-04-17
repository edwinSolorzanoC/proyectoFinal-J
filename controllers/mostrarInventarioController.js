// controllers/ingresosController.js
import mostrarInventarioModel from "../models/mostrarInventarioModel.js";

const mostrarInventarioController = {};

// Controlador para mostrar el reporte de ingresos
mostrarInventarioController.mostrarInventario = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await mostrarInventarioModel.obtenerInventario();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        

        // Asegurarse de que los datos se pasan correctamente
        res.render("inventario/mostrarInventario", { datosInventario: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesInventario:", error);
        res.redirect("/");
    }
};

export default mostrarInventarioController;
