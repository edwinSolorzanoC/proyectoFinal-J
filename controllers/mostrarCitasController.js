// controllers/ingresosController.js
import mostrarCitasModel from "../models/mostrarCitasModel.js";

const mostrarCitasController = {};

// Controlador para mostrar el reporte de ingresos
mostrarCitasController.mostrarReportesCitas = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await mostrarCitasModel.obtenerCitasSeleccionadas();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        
        // Asegurarse de que los datos se pasan correctamente
        res.render("citas/mostrarCitas", { datosCitas: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesCitas:", error);
        res.redirect("/");
    }
};

export default mostrarCitasController;

