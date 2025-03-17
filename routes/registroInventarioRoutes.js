
import express from 'express'
const router = express.Router();

import registroInventarioController from '../controllers/registroInventarioController.js';

router.post('/registrarInventario', registroInventarioController.registrarInventario);

export default router;