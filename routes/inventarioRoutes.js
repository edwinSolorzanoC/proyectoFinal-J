// routes/ingresoRoutes.js
import express from 'express';
import inventarioController from '../controllers/inventarioController.js';

const router = express.Router();

// Ruta para mostrar el reporte de ingresos
router.get('/reportesInventario', inventarioController.mostrarReportesInventario);


export default router;
