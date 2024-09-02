import { Router } from "express";
import { check, query } from "express-validator";
import { createInscripcion, getAllInscripciones, updateInscripcion, deleteInscripcion, getInscripciones } from "../controllers/inscripcion.controller";
import { validarCampos, validarjWT, isHaveRole } from "../middlewares";
// import { getAllMovimientos, createMovimiento, getMovimiento } from "../controllers/movImplemento.controller";
import { areImplementosNoExistById } from "../helpers/db-validators/implemento-validator";
import { isValidateUserExistById } from "../helpers/db-validators/user-validator";
import { isValidateEnvironmentExistById } from "../helpers/db-validators/environments-validators";
import { isInscripcionNoExist } from "../middlewares/validar-inscripcion";

const router = new Router()

router.get('/get-inscripcion',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    query('alumno', 'El alumno es invalido').optional().isMongoId(),
    query('alumno').optional().custom(isValidateUserExistById),
    query('matriculo', 'La persona que matriculó es invalido').optional().isMongoId(),
    query('matriculo').optional().custom(isValidateUserExistById),
    query('ambiente', 'El ambiente es invalido').optional().isMongoId(),
    query('ambiente').optional().custom(isValidateEnvironmentExistById),
    query('implementos').optional().custom(areImplementosNoExistById),
    validarCampos
], getInscripciones)

router.get('/get-all-inscripcion',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos
], getAllInscripciones)

router.post('/create-inscripcion',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('duration', 'La duración es obligatorio').not().isEmpty(),
    check('alumno', 'El alumno es obligatorio').not().isEmpty(),
    check('alumno', 'El alumno es invalido').isMongoId(),
    check('alumno').custom(isValidateUserExistById),
    check('matriculo', 'La persona que matriculó es obligatorio').not().isEmpty(),
    check('matriculo', 'La persona que matriculó es invalido').isMongoId(),
    check('matriculo').custom(isValidateUserExistById),
    check('ambiente', 'El ambiente es obligatorio').not().isEmpty(),
    check('ambiente', 'El ambiente es invalido').isMongoId(),
    check('ambiente').custom(isValidateEnvironmentExistById),
    check('implementos', 'Los implementos son obligatorio').not().isEmpty(),
    check('implementos').custom(areImplementosNoExistById),
    validarCampos
], createInscripcion)

router.put('/update-inscripcion/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('alumno', 'El alumno es invalido').optional().isMongoId(),
    check('alumno').optional().custom(isValidateUserExistById),
    check('matriculo', 'La persona que matriculó es invalido').optional().isMongoId(),
    check('matriculo').optional().custom(isValidateUserExistById),
    check('ambiente', 'El ambiente es invalido').optional().isMongoId(),
    check('ambiente').optional().custom(isValidateEnvironmentExistById),
    check('implementos').optional().custom(areImplementosNoExistById),
    validarCampos
], updateInscripcion)

router.delete('/eliminar-inscripcion/:id',
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    isInscripcionNoExist,
    validarCampos
], deleteInscripcion)

export default router