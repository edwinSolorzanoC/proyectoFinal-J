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


// PACIENTES
import registroPacientesRoutes from './routes/registroPacientesRoutes.js';
import mostrarPacientesRouter from './routes/mostrarPacientesRouter.js';
app.get('/registroPacientes', (req, res) => { res.render('pacientes/registroPacientes', { title: 'EJS' });});
app.post('/registrarPaciente', registroPacientesRoutes);
app.get('/mostrarPacientes', mostrarPacientesRouter)


// INVENTARIO
import registroInventarioRoutes from './routes/registroInventarioRoutes.js'
import inventarioBRoutes from  './routes/inventarioBRoutes.js'
import inventarioRoutes from  './routes/inventarioRoutes.js'
import mostrarInventario from './routes/mostrarInventarioRouter.js'

app.get('/registroInventario', (req, res) => {
    res.render('inventario/registroInventario', {title:'ejs'});
});
app.post('/registrarInventario', registroInventarioRoutes)
app.get('/reportesInventario',inventarioRoutes)
app.get('/reporteProductosStock',inventarioBRoutes)
app.get('/mostrarInventario', mostrarInventario)



// CITAS
import registroCitasRoutes from './routes/registroCitasRoutes.js'
import editarCitasRouter from './routes/editarCitasRouter.js';
import citasRoutes from  './routes/citasRoutes.js'
import citasCNRoutes from  './routes/citasCNRoutes.js'
import mostrarCitasRouter from './routes/mostrarCitasRouter.js'

app.get('/gestionarCitas', registroCitasRoutes);
app.post('/consultarCita', registroCitasRoutes);
app.get('/reporteCitas',citasRoutes);
app.get('/editarCitas', (req, res) => {res.render('editarCitas',)})
app.get('/reporteCitasCR',citasCNRoutes)
app.get('/mostrarCitas', mostrarCitasRouter);
app.post('/editarCitas', editarCitasRouter)
app.get('/editarCitasVista', editarCitasRouter);
app.post('/editarCitaExistente', editarCitasRouter)




// FINANZAS
import registroEgresosRoutes from './routes/registroEgresosRoutes.js'
import ingresoRoutes from  './routes/ingresoRoutes.js'
import mostrarEgresosRouter from './routes/mostrarEgresosRouter.js';

app.get('/registroEgresos',registroEgresosRoutes);
app.post('/realizarEgreso', registroEgresosRoutes);
app.get('/reportesIngresos',ingresoRoutes);
app.get('/mostrarEgresos',mostrarEgresosRouter)
app.get('/registroIngresos', (req,res) => {res.render('finanzas/registrarIngresos')})


import registrarMedicosRouter from './routes/registrarMedicosRouter.js'
app.get('/registrarMedicos', (req, res) => { res.render('administracion/registrarMedicos', { title: 'EJS' });})
app.post('/nuevoMedico', registrarMedicosRouter)