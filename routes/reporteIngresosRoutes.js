import express from 'express'
const router = express.Router();

import reporteIngresosController from '../controllers/reporteIngresosController.js';

router.get('/reportesIngresos', reporteIngresosController.consultaDatosIngresos);

export default router;