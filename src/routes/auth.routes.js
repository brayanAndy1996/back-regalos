import { Router } from 'express'
import { check } from "express-validator";
import validarCampos from '../middlewares/validar-campos'
import { loginController} from '../controllers/auth.controller'

const router = Router()

router.post('/login',  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController)

export default router