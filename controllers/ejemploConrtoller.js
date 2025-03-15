import nombrePAginaModel from "rutra de model";

const nombrePaginaController = {};

nombrePaginaController.nombreFuncionController = async (req, res) => {
   
    const nombreVariable = dato que se da a model para busqueda; 

    try {
        
        // Llamada al modelo para obtener los datos
        const results = await nombrePAginaModel.nomnreFuncionModel(nombreVariable);
        
        // Renderizar la vista con los resultados y la alerta
        res.render('pagina que se quiere renderizar', {datosParaFront: results.results});
    } catch (error) {
        
        console.error("identificador", error);
    }
};



export default indexController;
