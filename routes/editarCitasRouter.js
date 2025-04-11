// routes/ingresoRoutes.js
import express from 'express';

const router = express.Router();

import editarCitasController from '../controllers/editarCitasController.js';
router.post('/editarCitas', editarCitasController.mostrarDatos);
router.get('/editarCitasVista', editarCitasController.mostrarVista);

// Ruta para mostrar el reporte de ingresos

export default router;