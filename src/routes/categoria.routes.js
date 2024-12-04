import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT } from "../middlewares";
import { createCategoria } from "../controllers/categoria.controller";
import { validateProductExistByNombre } from "../helpers/db-validators/producto-validator";

const router = Router()

// router.get('/get-productos',
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     validarCampos
// ], getUsers)

// router.get('/get-all-users',
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     validarCampos
// ], getAllUsers)

router.post('/create-categoria',createCategoria)

// router.put('/update-user/:email', 
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     // check('email').custom(isValidateUserExistByEmail),
//     check('role', 'El rol no es valido').optional().isMongoId(),
//     validarCampos
// ], updateUser)

// router.delete('/delete-user/:email',
// [
//     validarjWT,
//     // isHaveRole('ADMIN'),
//     check('email').custom(isValidateUserNoExistByEmail),
//     validarCampos
// ], deleteUser)

export default router