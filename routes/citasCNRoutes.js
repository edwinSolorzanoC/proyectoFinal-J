// routes/ingresoRoutes.js
import express from 'express';
import citasCNController from '../controllers/citasCNController.js';

const router = express.Router();

// Ruta para mostrar el reporte de ingresos
router.get('/reporteCitasCR', citasCNController.mostrarReportesCitas);

export default router;