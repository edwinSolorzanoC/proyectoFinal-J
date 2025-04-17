// routes/ingresoRoutes.js
import express from 'express';
import mostrarInventarioController from '../controllers/mostrarInventarioController.js';

const router = express.Router();

router.get('/mostrarInventario', mostrarInventarioController.mostrarInventario);


export default router;
