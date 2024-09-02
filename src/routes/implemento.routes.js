import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT, isHaveRole } from "../middlewares";
import { getAllImplementos, createImplementos, updateImplemento, deleteImplemento, getImplementos } from "../controllers/implementos.controller";
import { isImplementoExist } from "../helpers/db-validators";
import { isImplementoNoExist } from "../middlewares/validar-implemento";

const router = new Router()

router.get('/get-implementos',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getImplementos)

router.get('/get-all-implementos',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getAllImplementos)

router.post('/create-implemento',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('stock', 'El stock debe ser un número entero').isInt(),
    check('name').custom(isImplementoExist),
    validarCampos
], createImplementos)

router.put('/update-implemento/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    isImplementoNoExist,
    check('stock', 'El stock debe ser un número entero').optional().isInt(),
    check('name').custom(isImplementoExist),
    validarCampos
], updateImplemento)

router.delete('/eliminar-implemento/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    isImplementoNoExist,
    validarCampos
], deleteImplemento)

export default router