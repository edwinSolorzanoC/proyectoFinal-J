
import pool from "../config/conexion.js";

const precioCitaModel = {}

precioCitaModel.obtenerCitasSeleccionadas = async (id) => {

    const query = `
        
    SELECT tablaCitas.idtb_citas, tb_medicos_idtb_medicos, tb_medicos_tb_usuarios_idtb_usuarios, tb_medicos_tb_usuarios_tb_persona_idtb_persona, tb_pacientes_idtb_pacientes, tb_pacientes_tb_persona_idtb_persona,
    tablaPersonaPaciente.primerApellido as apellidoUnoPaciente, tablaPersonaPaciente.segundoApellido as apellidoDosPaciente, tablaPersonaPaciente.primerNombre as nombreUnoPaciente, tablaPersonaPaciente.segundoNombre as nombreDosPaciente,
    tablaPersonaMedicos.primerApellido as primerApellidoMedico, tablaPersonaMedicos.segundoApellido as segundoApellidoMedico, tablaPersonaMedicos.primerNombre as primerNombreMedico, tablaPersonaMedicos.segundoNombre as segundoNombreMedico
    ,tablaPersonaPaciente.cedula, tablaMedicos.especialidad
    FROM tb_citas tablaCitas
    JOIN tb_pacientes tablaPacientes ON tablaCitas.tb_pacientes_idtb_pacientes = tablaPacientes.idtb_pacientes
    JOIN tb_persona tablaPersonaPaciente ON tablaPacientes.tb_persona_idtb_persona = tablaPersonaPaciente.idtb_persona
    JOIN tb_medicos tablaMedicos ON tablaCitas.tb_medicos_idtb_medicos = tablaMedicos.idtb_medicos
    JOIN tb_persona tablaPersonaMedicos ON tablaMedicos.tb_usuarios_tb_persona_idtb_persona = tablaPersonaMedicos.idtb_persona
    WHERE idtb_citas = ?;
    `; 

    const queryMedicamentos = `SELECT idtb_medicamentos, nombre FROM tb_medicamentos`;
    
    try {
        
        
        const [result] = await pool.execute(query, [id]);
        const [resultsMedicamentos] = await pool.execute(queryMedicamentos)
        return {
            datosPrecioCitas: result,
            medicamentos: resultsMedicamentos
          };
          
    } catch (error) {
        console.error("Error al obtener los de citas model precio:", error);
        
    }
};


precioCitaModel.insertarCostos = async(
    costoTotal,costoCita, fechaDeHoy, 

    idCita,
    idMedico,
    idMedicoUsuario,
    idMedicoPersona,
    idPaciente,
    idPacientePersona,

    estadoCita,
    descripcionIngreso,

    medicamentos
) => {

    const queryInsertar =  `
    
    INSERT INTO tb_facturas(
    montoTotal,
    montoCita,
    fechaEmision,

    tb_movimientosMedicamentos_idtb_movimientosMedicamentos,
    tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos,

    tb_citas_idtb_citas,
    tb_citas_tb_medicos_idtb_medicos,
    tb_citas_tb_medicos_tb_usuarios_idtb_usuarios,
    tb_citas_tb_medicos_tb_usuarios_tb_persona_idtb_persona,
    tb_citas_tb_pacientes_idtb_pacientes,
    tb_citas_tb_pacientes_tb_persona_idtb_persona
    )VALUES(
    ?,
    ?,
    ?,

    NULL,
    NULL,

    ?,
    ?,
    ?,
    ?,
    ?,
    ?);  `;

    const queryCita = `
    
    UPDATE tb_citas
    SET estado = ?
    WHERE idtb_citas = ?;
    `;
    
    const queryIngresos = `
    INSERT INTO tb_ingersos(
    fecha,descripcion,
    montoTotal,
    tb_facturas_idtb_facturas
    )VALUES(
    ?, ?, ?, ?);`

    const queryActualizarMedicamento = `
    UPDATE tb_medicamentos
    SET cantidad = cantidad - 1
    WHERE idtb_medicamentos = ?;
    `;

    const queryRegistrarMovimiento = `
    INSERT INTO tb_movimientosmedicamentos(
    tipoMovimiento,
    cantidad,
    fechaMovimiento,
    montoMovimiento,
    motivo,
    tb_medicamentos_idtb_medicamentos
    )VALUES(?, ?, ?, ?, ?, ?);
    `;

    try {

        const [resultsFactura] = await pool.execute(queryInsertar, [
        costoTotal,costoCita, fechaDeHoy, 

        idCita,
        idMedico,
        idMedicoUsuario,
        idMedicoPersona,
        idPaciente,
        idPacientePersona])

        const idFactura = resultsFactura.insertId;

        await pool.execute(queryCita, [ estadoCita, idCita]);

        await pool.execute(queryIngresos, [fechaDeHoy, descripcionIngreso, costoTotal, idFactura])

         
         for (const idMedicamento of medicamentos) {
            
            await pool.execute(queryActualizarMedicamento, [idMedicamento]);

           
            await pool.execute(queryRegistrarMovimiento, [
                "VENTA MEDICAMENTO",  
                1,
                fechaDeHoy,
                costoCita,   // Puedes ajustar el monto relacionado al medicamento si aplica
                "Venta por Cita",  // Motivo del movimiento
                idMedicamento
            ]);
        }
        
    } catch (error) {
        console.log("Error en el model de insertar costos", error)
    }
}
precioCitaModel.buscarMedicamentos = async (medicamentos) => {
    const placeholders = medicamentos.map(() => '?').join(', ');
    const query = `SELECT precioVenta FROM tb_medicamentos WHERE idtb_medicamentos IN (${placeholders})`;

    try {
        const [resultados] = await pool.execute(query, medicamentos); // <-- aquí se pasa el array plano
        return [resultados];
    } catch (error) {
        console.log("Error en pedir medicamentos", error);
    }
};





export default precioCitaModel