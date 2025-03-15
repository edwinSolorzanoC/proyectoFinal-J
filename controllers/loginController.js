import loginModel from "../models/loginModel.js";
import bcrypt from "bcryptjs";

const loginController = {};

loginController.verificarCredenciales = async (req, res) => {
    
    const { nombreUsuarioLogin, contrasennaUsuarioLogin } = req.body;

    try {
        // Llamada al modelo para consultar el usuario
        const results = await loginModel.verificarCredencialesLogin(nombreUsuarioLogin, contrasennaUsuarioLogin);

        if (results.length > 0) {
            
            const resultados = results[0];

            if(contrasennaUsuarioLogin === resultados.contrasenna){
                return res.redirect('/menu')
            }
            console.log("Contraseña incorrecta")
        }
        console.log("usuario no encontrado")

    } catch (error) {
        // Manejo de errores en el controlador
        console.error("Error en el catch login controller", error);
        return res.redirect('/');
    }
};

export default loginController;