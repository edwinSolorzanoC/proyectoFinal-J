import pool from "../config/conexion.js"

const registroEgresosModel = {};

registroEgresosModel.peticionDatos = async() => {

    const datosMedicamentos = `SELECT nombre from tb_medicamentos;`;

    try {
        const medicamentos = await pool.execute(datosMedicamentos);
        return medicamentos;
    } catch (error) {
        console.log("Error en el model de inicio de registro de egresos/peticion de medicamentos")
    }
}

registroEgresosModel.registroEgreso = async(
    tipoEgreso,
    fechaDeHoy,
    medicamentoEgreso,
    cantidadProductoEgreso,
    montoTotalEgreso,
    motivoEgreso
) => {

    const consultaIdMedicamento = `
    SELECT idtb_medicamentos FROM tb_medicamentos  WHERE nombre = ?`;

    const envioDatosMovimineto = `
    INSERT INTO tb_movimientosmedicamentos(
    tipoMovimiento, cantidad, fechaMovimiento, montoMovimiento, motivo, tb_medicamentos_idtb_medicamentos
    )VALUES(?,?,?,?,?,?);`;

    const registroEgreso = `
        INSERT INTO tb_egresos(
        fecha, 
        descripcion, 
        montoTotal,
        numerofactura,
        tb_movimientosMedicamentos_idtb_movimientosMedicamentos,
        tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos
        )VALUES(?, ?, ?, ?, ?, ?)`;

    const consultaUltimoIdMovimiento = `SELECT LAST_INSERT_ID() AS idMovimiento;`;
    
    try {
        
        const [datosMedicamentos] = await pool.execute(consultaIdMedicamento, [medicamentoEgreso])
        const idMedicamento = datosMedicamentos[0].idtb_medicamentos;

        await pool.execute(envioDatosMovimineto, [
            tipoEgreso, 
            cantidadProductoEgreso, 
            fechaDeHoy, 
            montoTotalEgreso, 
            motivoEgreso, 
            idMedicamento
        ]);

        const [resultadoMovimiento] = await pool.execute(consultaUltimoIdMovimiento);
        const idMovimiento = resultadoMovimiento[0].idMovimiento;

        await pool.execute(registroEgreso, [fechaDeHoy, motivoEgreso, montoTotalEgreso, idMovimiento,idMovimiento, idMedicamento])

    } catch (error) {
        console.log("Error en el model de ingreso de medicamentos" , error)
    }
}
export default registroEgresosModel