
import express from 'express';

import mostrarCitasController from '../controllers/mostrarCitasController.js';

const router = express.Router();


router.get('/mostrarCitas', mostrarCitasController.mostrarReportesCitas);


export default router;