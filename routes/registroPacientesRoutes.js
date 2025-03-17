import express from 'express'
const router = express.Router();

import registroPacientesController from '../controllers/registroPacientesController.js';
router.post('/registrarPaciente', registroPacientesController.registrarPaciente);

export default router;