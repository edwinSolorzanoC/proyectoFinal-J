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

// DE ACA PARA ABAJO AÑADIR LAS RUTAS EJS
app.get('/menu', (req, res) => {
    res.render('menu', { title: 'EJS' });
});

app.get('/registroPacientes', (req, res) => {
    res.render('registroPacientes', { title: 'EJS' });
});

app.get('/registroInventario', (req, res) => {
    res.render('registroInventario', {title:'ejs'});
});

app.get('/gestionarCitas', (req, res) => {
    res.render('gestionarCitas', {title:'ejs'});
});

app.get('/registroEgresos', (req, res) => {
    res.render('registroEgresos', {title:'ejs'});
});

app.get('/reportesIngresos', (req, res) => {
    res.render('reportesIngresos', {title:'ejs'});
});

app.get('/reportesInventario', (req, res) => {
    res.render('reportesInventario', {title:'ejs'});
});

app.get('/reporteCitas', (req, res) => {
    res.render('reporteCitas', {title:'ejs'});
});

app.get('/reporteCitasCR', (req, res) => {
    res.render('reporteCitasCR', {title:'ejs'});
});

app.get('/reporteProductosStock', (req, res) => {
    res.render('reporteProductosStock', {title:'ejs'});
});

app.get('/seguridad', (req, res) =>{
    res.render('seguridad', {title:'ejs'})
})