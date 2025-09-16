import { Router } from "express";
import CancionesController from '../controllers/canciones.controller.js'

const router = Router()

router.get("/canciones", CancionesController.getCanciones);

export default router;