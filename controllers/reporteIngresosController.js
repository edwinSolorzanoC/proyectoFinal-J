import reporteIngresosModel from "../models/reporteIngresosModel.js";

const reporteIngresosController = {};

reporteIngresosController.consultaDatosIngresos = async (req, res) => {
    try{
        const resultados = await reporteIngresosModel.consultaDatosIngresos();
        res.render('reportesIngresos', {datosIngresos: resultados})
    }catch(error){
        console.log("Error en el controller de reportes ingresos");
    }
}

export default reporteIngresosController;