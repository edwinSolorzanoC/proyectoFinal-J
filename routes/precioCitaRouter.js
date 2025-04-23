
import express from 'express';

const router = express.Router();

import precioCitaController from '../controllers/precioCitaController.js';

router.get('/precioCita', precioCitaController.mostrarVista);
router.post('/registrarCostosCita', precioCitaController.insertarCostos);

export default router;