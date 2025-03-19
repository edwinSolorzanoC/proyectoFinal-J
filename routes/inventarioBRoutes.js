// routes/ingresoRoutes.js
import express from 'express';
import inventarioBController from '../controllers/inventarioBController.js';

const router = express.Router();

// Ruta para mostrar el reporte de ingresos
router.get('/reporteProductosStock', inventarioBController.mostrarReportesInventario);

export default router;
