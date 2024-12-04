import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT } from "../middlewares";
import { createProducto, getProductos, updateProduct } from "../controllers/producto.controller";
import { validateProductExistByNombre } from "../helpers/db-validators/producto-validator";

const router = Router()

// router.get('/get-productos',
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     validarCampos
// ], getUsers)

router.get('/get-productos',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getProductos)

router.post(
'/create-producto',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('nombre', 'El producto debe de tener un nombre').not().isEmpty(),
    check('nombre').custom(validateProductExistByNombre),
    check('precio', 'El producto debe de tener un precio').not().isEmpty(),
    check('stock', 'El producto debe de tener un stock').not().isEmpty(),
    check('descripcion', 'La descripción debe de tener un maximo de 200 caracteres').isLength({ max: 200 }),
    check('categoria', 'La categoria es invalida').optional().isMongoId(),
    // check('email').custom(validateEmail),
    validarCampos
],createProducto)

router.put('/update-product/:idProduct', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // check('email').custom(isValidateUserExistByEmail),
    // check('role', 'El rol no es valido').optional().isMongoId(),
    validarCampos
], updateProduct)

// router.delete('/delete-user/:email',
// [
//     validarjWT,
//     // isHaveRole('ADMIN'),
//     check('email').custom(isValidateUserNoExistByEmail),
//     validarCampos
// ], deleteUser)

export default router