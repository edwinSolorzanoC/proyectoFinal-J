
import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'contraseña de mysql',
    database: 'nombre base datos'
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error en la conexión a MySQL:', err);
        return;
    }
    connection.release();
});

export default pool.promise();