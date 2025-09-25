import { Router } from "express";
import {verifyAdmin, verifyToken} from '../middlewares/auth.middleware.js'
import CancionesController from '../controllers/canciones.controller.js';

const router = Router()

router.get("/", CancionesController.getCanciones);
router.post("/", verifyToken, verifyAdmin, CancionesController.createCancion);
router.put('/', verifyToken, verifyAdmin, CancionesController.updateCancion);
router.delete('/', verifyToken, verifyAdmin, CancionesController.deleteCancion);
//router.get('/escucho', verifyToken, CancionesControlles.getEscucho)

export default router;