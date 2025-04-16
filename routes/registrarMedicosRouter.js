import express from 'express'

const router = express.Router();
import registrarMedicosController from '../controllers/registrarMedicosController.js';

router.post("/nuevoMedico", registrarMedicosController.nueviMedico)
export default router;