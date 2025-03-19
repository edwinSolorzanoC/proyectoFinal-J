
import express from 'express'
const router = express.Router();

import registroEgresosController from '../controllers/registroEgresosController.js';

router.get('/registroEgresos', registroEgresosController.peticionDeMedicamentos);
router.post('/realizarEgreso', registroEgresosController.insertarEgreso);

export default router;