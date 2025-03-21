import express from 'express';
import path from 'path';
import session from 'express-session';

const app = express();
app.use(express.urlencoded({ extended: true })); //esto es para que el servidor entienda los formatos de los formularios
app.use(express.json());//esto es para que el servidor entienda los formatos json


// Configuración de express-session para que funcionen las sesiones
app.use(session({
    secret: 'clavegrupo4ingsoftware', 
    resave: false,               // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: true,     // Guardar una sesión nueva si no tiene valores
    cookie: { secure: false }    // Si se usa hay HTTPS hay que cambiar 'false' a 'true'
}));

// esta es para que el sitio abra en el puerto 3000
const port =  3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//esto es para que el servidor pueda abrir archivos estaticos osea html
app.use(express.static(path.join(process.cwd(), 'public')));

//esto es para abrir archivos dinamicos osea ejs
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


// Ruta principal para servir el archivo principal, en este caso html login
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
});

import loginRoutes from './routes/loginRoutes.js'
app.post('/verificarCredenciales', loginRoutes);

// DE ACA PARA ABAJO AÑADIR LAS RUTAS EJS
app.get('/menu', (req, res) => {
    res.render('menu', { title: 'EJS' });
});

import registroPacientesRoutes from './routes/registroPacientesRoutes.js'
app.get('/registroPacientes', (req, res) => {
    res.render('registroPacientes', { title: 'EJS' });
});
app.post('/registrarPaciente', registroPacientesRoutes);

import registroInventarioRoutes from './routes/registroInventarioRoutes.js'
app.get('/registroInventario', (req, res) => {
    res.render('registroInventario', {title:'ejs'});
});
app.post('/registrarInventario', registroInventarioRoutes)

import registroCitasRoutes from './routes/registroCitasRoutes.js'
app.get('/gestionarCitas', registroCitasRoutes);
app.post('/consultarCita', registroCitasRoutes);


import registroEgresosRoutes from './routes/registroEgresosRoutes.js'
app.get('/registroEgresos',registroEgresosRoutes);
app.post('/realizarEgreso', registroEgresosRoutes);



import ingresoRoutes from  './routes/ingresoRoutes.js'
app.get('/reportesIngresos',ingresoRoutes)

import inventarioRoutes from  './routes/inventarioRoutes.js'
app.get('/reportesInventario',inventarioRoutes)


import citasRoutes from  './routes/citasRoutes.js'
app.get('/reporteCitas',citasRoutes)

import citasCNRoutes from  './routes/citasCNRoutes.js'
app.get('/reporteCitasCR',citasCNRoutes)

import inventarioBRoutes from  './routes/inventarioBRoutes.js'
app.get('/reporteProductosStock',inventarioBRoutes)

app.get('/seguridad', (req, res) =>{
    res.render('seguridad', {title:'ejs'})
})