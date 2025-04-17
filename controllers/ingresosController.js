// controllers/ingresosController.js
import ingresoModel from "../models/ingresoModel.js";

const ingresosController = {};

// Controlador para mostrar el reporte de ingresos
ingresosController.mostrarReportesIngresos = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await ingresoModel.obtenerIngresosSeleccionados();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        

        // Asegurarse de que los datos se pasan correctamente
        res.render("finanzas/reportesIngresos", { datosIngresos: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesIngresos:", error);
        res.redirect("/");
    }
};

export default ingresosController;
