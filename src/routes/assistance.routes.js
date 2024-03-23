import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarjWT, isHaveRole } from "../middlewares";
import { createAssistance, getAssistance } from "../controllers/assistance.controller";
import { isDateValidate } from "../helpers/custom-validations/validate-date";

const router = new Router()

router.get('/get-all-assistance', (req, res) => {
    res.send('Assistance')
})

router.get('/get-assistance',
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('startDate', 'La fecha de inicio no es valida').optional().custom(isDateValidate),
    check('endDate', 'La fecha de fin no es valida').optional().custom(isDateValidate),
    validarCampos
], getAssistance)

router.post('/create-assistance', 
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('environment', 'El ambiente es obligatorio').not().isEmpty(),
    check('environment', 'El ambiente no es valido').isMongoId(),
    check('student', 'El estudiante es obligatorio').not().isEmpty(),
    check('student', 'El estudiante no es valido').isMongoId(),
    check('checker', 'El verificador es obligatorio').not().isEmpty(),
    check('checker', 'El verificador no es valido').isMongoId(),
    validarCampos
], createAssistance)

export default router