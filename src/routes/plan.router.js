import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT, isHaveRole } from "../middlewares";
import { getPlan, getAllPlanes, createPlan, updatePlan, deletePlan } from "../controllers/plan.controller";
import { areImplementosNoExistById } from "../helpers/db-validators/implemento-validator";
import { isPlanExist, isPlanExistById, isPlanNoExist } from "../middlewares/validar-plan";

const router = new Router()

router.get('/get-plan',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getPlan)

router.get('/get-all-plan',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getAllPlanes)

router.post('/create-plan',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('duration', 'La duración es obligatorio').not().isEmpty(),
    check('duration', 'La duración debe ser un número entero').isInt(),
    check('ambiente', 'El ambiente es obligatorio').not().isEmpty(),
    check('ambiente', 'El ambiente es invalido').isMongoId(),
    check('implementos', 'Los implementos son invalidos').optional().isMongoId(),
    check('implementos').optional().custom(areImplementosNoExistById),
    isPlanExist,
    validarCampos
], createPlan)

router.put('/update-plan/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('ambiente', 'El ambiente es invalido').optional().isMongoId(),
    check('implementos', 'Los implementos son invalidos').optional().isMongoId(),
    check('implementos').optional().custom(areImplementosNoExistById),
    isPlanExistById,
    validarCampos
], updatePlan)

router.delete('/eliminar-plan/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    isPlanNoExist,
    validarCampos
], deletePlan)

export default router