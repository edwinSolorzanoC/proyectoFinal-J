import registroEgresosModel from "../models/registroEgresosModel.js";

const registroEgresosController = {};

registroEgresosController.peticionDeMedicamentos = async (req, res) => {
    try {
        const [resultadosMedicamentos] = await registroEgresosModel.peticionDatos()
        res.render('registroEgresos', {datosMedicamentos: resultadosMedicamentos})
    } catch (error) {
        console.log("Error en el controller de petiicon de medicamentos registro egresos")
    }
}

registroEgresosController.insertarEgreso = async(req,res) => {
    const{
        medicamentoEgreso,
        cantidadProductoEgreso,
        montoTotalEgreso,
        motivoEgreso
    } = req.body;

    const tipoEgreso = "Salida";
    const fechaDeHoy = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD

    try {
        await registroEgresosModel.registroEgreso(
            tipoEgreso,
            fechaDeHoy,
            medicamentoEgreso,
            cantidadProductoEgreso,
            montoTotalEgreso,
            motivoEgreso
        )

        res.redirect('/registroEgresos?success=newRegister')
    } catch (error) {
        console.log("Error en el controller de regstrar egresos")
    }
}
export default registroEgresosController;