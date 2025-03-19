// routes/ingresoRoutes.js
import express from 'express';
import ingresosController from '../controllers/ingresosController.js';

const router = express.Router();

// Ruta para mostrar el reporte de ingresos
router.get('/reportesIngresos', ingresosController.mostrarReportesIngresos);

export default router;
