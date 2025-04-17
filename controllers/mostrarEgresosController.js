// controllers/ingresosController.js
import mostrarEgresosModel from "../models/mostrarEgresosModel.js";
const mostrarEgresosController = {};

mostrarEgresosController.mostrarEgresos = async (req, res) => {
    try {
        const resultados = await mostrarEgresosModel.obtenerEgresos();

        res.render("finanzas/mostrarEgresos", { datosEgresos: resultados });

    } catch (error) {
        console.log("❌ Error en mmostrar egresos controller:", error);
        res.redirect("/");
    }
};

export default mostrarEgresosController;

