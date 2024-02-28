import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, isHaveRole, validarSizeTelefono, validarjWT } from "../middlewares";
import { validateEmail, isValidateUserNoExist, isValidateUserExist } from "../helpers/db-validators";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/users.controller";

const router = Router()

router.get('/get-users',
[
    validarjWT,
    isHaveRole('ADMIN'),
    validarCampos
], getUsers)

router.post(
'/create-user',
[
    validarjWT,
    isHaveRole('ADMIN'),
    check('nroDoc', 'El número de documento es obligatorio').not().isEmpty(),
    check('tipoDoc', 'El tipo de documento es obligatorio').not().isEmpty(),
    check('nombreCom', 'El nombre completo es obligatorio').not().isEmpty(),
    check('rol', 'Necesita un rol').not().isEmpty(),
    check('nroDoc').custom(isValidateUserExist),
    check('email').custom(validateEmail),
    validarSizeTelefono,
    validarCampos
],createUser)

router.put('/update-user/:nroDocParam/:tipoDocParam', 
[
    validarjWT,
    isHaveRole('ADMIN'),
    check('nroDoc').custom(isValidateUserNoExist),
    validarCampos
], updateUser)

router.delete('/delete-user/:nroDocParam/:tipoDocParam',
[
    validarjWT,
    isHaveRole('ADMIN'),
    check('nroDoc').custom(isValidateUserNoExist),
    validarCampos
], deleteUser)

export default router