import express from 'express';

const router = express.Router();
import mostrarPacienteController from '../controllers/mostrarPacientesController.js';

router.get('/mostrarPacientes', mostrarPacienteController.inicio)
export default router;