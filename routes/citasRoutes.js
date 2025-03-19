// routes/ingresoRoutes.js
import express from 'express';
import citasController from '../controllers/citasController.js';

const router = express.Router();

// Ruta para mostrar el reporte de ingresos
router.get('/reporteCitas', citasController.mostrarReportesCitas);

export default router;