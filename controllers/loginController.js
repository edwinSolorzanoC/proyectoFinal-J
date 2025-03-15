import loginModel from "../models/loginModel.js";
import bcrypt from "bcryptjs";

const loginController = {};

loginController.verificarCredenciales = async (req, res) => {
    
    const { nombreUsuarioLogin, contrasennaUsuarioLogin } = req.body;

    try {
        // Llamada al modelo para consultar el usuario
        const results = await loginModel.verificarCredencialesLogin(nombreUsuarioLogin, contrasennaUsuarioLogin);

        //se revisa si hay existencia en esos datos
        if (results.length > 0) {
            
            const resultados = results[0];

            //se vuelve a verificar que la contraseña digitada sea igual a la de la bd
            if(contrasennaUsuarioLogin === resultados.contrasenna){
                return res.redirect('/menu?success=loginSuccess');
            }
        }
        console.log("usuario y/o contraseña incorrectos")
        return res.redirect('/?error=userNotFound');

    } catch (error) {
        // Manejo de errores en el controlador
        console.error("Error en el catch login controller", error);
        return res.redirect('/'); //si hay error se manda a login.html
    }
};

export default loginController;