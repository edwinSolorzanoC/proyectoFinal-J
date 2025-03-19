// controllers/ingresosController.js
import citasModel from "../models/citasModel.js";

const citasController = {};

// Controlador para mostrar el reporte de ingresos
citasController.mostrarReportesCitas = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await citasModel.obtenerCitasSeleccionadas();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        
        // Asegurarse de que los datos se pasan correctamente
        res.render("reporteCitas", { datosCitas: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesCitas:", error);
        res.redirect("/");
    }
};

export default citasController;

