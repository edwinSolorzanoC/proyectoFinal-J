
import express from 'express'
const router = express.Router();

import registroCitasController from '../controllers/registroCitasController.js';

router.get('/gestionarCitas', registroCitasController.mostrarDatosMedicos);

router.post('/registrarCitas', registroCitasController.registrarNuevaCita)

export default router