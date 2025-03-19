// controllers/ingresosController.js
import citasCNModel from "../models/citasCNModel.js";

const citasCNController = {};

// Controlador para mostrar el reporte de ingresos
citasCNController.mostrarReportesCitas = async (req, res) => {
    try {
        // Obtener los datos de los ingresos desde el modelo
        const resultados = await citasCNModel.obtenerCitasSeleccionadas();

        // Verificar que 'resultados' contenga datos antes de pasar a la vista
        

        // Asegurarse de que los datos se pasan correctamente
        res.render("reporteCitasCR", { datosCitasCN: resultados });// Asegúrate de que datosParaFront esté definido correctamente

    } catch (error) {
        console.log("❌ Error en mostrarReportesCitas:", error);
        res.redirect("/");
    }
};

export default citasCNController;