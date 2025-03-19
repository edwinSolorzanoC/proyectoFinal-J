
import express from 'express'
const router = express.Router();

import registroCitasController from '../controllers/registroCitasController.js';

router.get('/gestionarCitas', registroCitasController.mostrarDatosMedicos);
router.post('/consultarCita', registroCitasController.consultaCitas);

export default router