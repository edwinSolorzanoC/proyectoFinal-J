
import express from 'express'

const router = express.Router();

import facturacionController from '../controllers/facturacionController.js';
router.get('/facturacion', facturacionController.inicio)

export default router