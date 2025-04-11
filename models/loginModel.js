import pool from "../config/conexion.js";

const loginModel = {};

// consultar usuario digitado por usuario en el form de login
loginModel.verificarCredencialesLogin = async (nombreUsuarioLogin, contrasennaUsuarioLogin) => {

    const query = `
    SELECT nombreUsuario, contrasenna
    FROM tb_usuarios
    WHERE nombreUsuario = ? AND contrasenna = ?;`;
    
    try {
      const [results] = await pool.execute(query, [nombreUsuarioLogin,contrasennaUsuarioLogin]);
      return results;
  
    } catch (error) {
      console.log("Error en el catch model login", error)
      res.redirect('/');
    }
  
  };

  


  export default loginModel;

