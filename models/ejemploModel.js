import pool from "ruta de conexion";

const nombrePAginaModel = {};

nombrePAginaModel.nomnreFuncionModel = async (variable que se ocupa para peticion) => {

    const nombrevariable = `codigo sql`;

    try {
        const [results] = await pool.execute(nombrevariable, [nombre variable peticion]);

        return {results};
    } catch (error) {
        console.log("identificadir de error", error)
    }
};


export default nombrePAginaModel;
