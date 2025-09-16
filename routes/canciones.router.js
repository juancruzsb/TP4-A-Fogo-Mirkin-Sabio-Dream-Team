import { Router } from "express";
import CancionesController from '../controllers/canciones.controller.js'

const router = Router()

router.get("/canciones", CancionesController.getCanciones);
router.post('/', verifyToken, verifyAdmin, CancionController.createCancion);
router.put('/:id', verifyToken, verifyAdmin, CancionController.updateCancion);
router.delete('/:id', verifyToken, verifyAdmin, CancionController.deleteCancion);

export default router;