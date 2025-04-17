import express from 'express';

const router = express.Router();

import mostrarEgresos from '../controllers/mostrarEgresosController.js'
router.get('/mostrarEgresos', mostrarEgresos.mostrarEgresos)

export default router;