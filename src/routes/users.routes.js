import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT } from "../middlewares";
import { validateEmail, isValidateUserNoExistByEmail } from "../helpers/db-validators";
import { createUser, getUsers, updateUser, deleteUser, getAllUsers } from "../controllers/users.controller";

const router = Router()

router.get('/get-users',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    validarCampos
], getUsers)

router.get('/get-all-users',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    validarCampos
], getAllUsers)

router.post(
'/create-user',
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('role', 'El rol no es valido').optional().isMongoId(),
    check('email').custom(validateEmail),
    validarCampos
],createUser)

router.put('/update-user/:email', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // check('email').custom(isValidateUserExistByEmail),
    check('role', 'El rol no es valido').optional().isMongoId(),
    validarCampos
], updateUser)

router.delete('/delete-user/:email',
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('email').custom(isValidateUserNoExistByEmail),
    validarCampos
], deleteUser)

export default router