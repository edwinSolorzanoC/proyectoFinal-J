import express from 'express';

const router = express.Router();

import editarInventarioController from '../controllers/editarInventarioController.js';

router.get('/mostrarEditarInventario', editarInventarioController.mostrarVista)
router.post('/editarProducto', editarInventarioController.editarProducto)
export default router;