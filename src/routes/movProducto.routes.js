import { Router } from "express";
import { check, query } from "express-validator";
import { validarCampos, validarjWT, isHaveRole } from "../middlewares";
import { getAllMovimientos, createMovimiento, getMovimiento } from "../controllers/movProducto.controller";
import { isImplementoExistById } from "../helpers/db-validators/implemento-validator";
import { isValidateUserExistById } from "../helpers/db-validators/user-validator";

const router = new Router()

router.get('/get-movImplemento',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    query('usuario', 'El usuario es invalido').optional().isMongoId(),
    query('usuario').optional().custom(isValidateUserExistById),
    query('implemento', 'El implemento es invalido').optional().isMongoId(),
    query('implemento').optional().custom(isImplementoExistById),
    validarCampos
], getMovimiento)

router.get('/get-all-movImplemento',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getAllMovimientos)

router.post('/create-movImplemento',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('cantidad', 'La cantidad es obligatorio').not().isEmpty(),
    check('tipoMovimiento', 'El tipo de movimiento es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es invalido').isMongoId(),
    check('usuario').custom(isValidateUserExistById),
    check('implemento', 'El implemento es obligatorio').not().isEmpty(),
    check('implemento', 'El implemento es invalido').isMongoId(),
    check('implemento').custom(isImplementoExistById),
    validarCampos
], createMovimiento)

// router.put('/update-movImplemento/:id',
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     check('usuario', 'El usuario es invalido').optional().isMongoId(),
//     check('usuario').optional().custom(isValidateUserExistById),
//     check('implemento', 'El implemento es invalido').optional().isMongoId(),
//     check('implemento').optional().custom(isImplementoExistById),
//     isMovimientoNoExistById,
//     validarCampos
// ], updateMovimiento)

// router.delete('/eliminar-movImplemento/:id',
// [
//     // validarjWT,
//     // isHaveRole('ADMIN'),
//     isPlanNoExist,
//     validarCampos
// ], deletePlan)

export default router