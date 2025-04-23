
import editarCitasModel from "../models/editarCitasModel.js";


const editarCitasController = {};

editarCitasController.mostrarDatos = async (req, res) => {
    
    const id = req.body.id;

    try {
        // Llamada al modelo para consultar el usuario
        const results = await editarCitasModel.obtenerCitasSeleccionadas(id);
        
        return res.render('citas/editarCitas', { datosCitas: results });

    } catch (error) {
        // Manejo de errores en el controlador
        console.error("Error en el catch editarCitas controller", error);
        return res.redirect('/'); //si hay error se manda a login.html
    }
};

editarCitasController.mostrarVista = async (req, res) => {
    const id = req.query.id; // <-- lo sacamos de la URL
  
    try {
      const results = await editarCitasModel.obtenerCitasSeleccionadas(id);
      return res.render('citas/editarCitas', { datosCitas: results });
    } catch (error) {
      console.error("❌ Error en mostrarVista:", error);
      res.redirect('/');
    }
};

editarCitasController.editarCita = async (req,res) => {


  const {
    idCita,
    fechaCita,
    horaCita,
    estadoCita

  } = req.body;
  

  try {
    

    await editarCitasModel.editarCita(idCita, fechaCita, horaCita, estadoCita);
    return res.redirect('mostrarCitas?success=newRegistrer');


  } catch (error) {
    console.log("Error en el controller de editar citas", error)
  }
}

export default editarCitasController;