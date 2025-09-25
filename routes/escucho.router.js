import { Router } from "express";
import {verifyAdmin, verifyToken} from '../middlewares/auth.middleware.js'
import escuchoController from '../controllers/escucho.controller.js';

const router = Router()

router.post('/', verifyToken, escuchoController.grabarEscucha)

export default router;