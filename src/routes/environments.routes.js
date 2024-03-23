import { Router } from "express"
import { check } from "express-validator"
import { validarCampos, isHaveRole, validarjWT} from "../middlewares";
import { isValidateEnvironmentExist } from "../helpers/db-validators";
import { createEnvironment, updateEnvironment, deleteEnvironment, getAllEnvironments, getEnvironments } from "../controllers/environments.controller";
import { isTimeValidate } from "../helpers/custom-validations/validate-date";

const router = Router()

router.get('/get-all-environments', 
[
        validarjWT,
        // isHaveRole('ADMIN'),
        validarCampos
], getAllEnvironments)

router.get('/get-environments',
[
        validarjWT,
        // isHaveRole('ADMIN'),
        validarCampos
], getEnvironments)

router.post('/create-environment',
[
        validarjWT,
        // isHaveRole('ADMIN'),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('name').custom(isValidateEnvironmentExist),
        check('tutor', 'El tutor no es valido').optional().isMongoId(),
        validarCampos
], createEnvironment)

router.put('/update-environment/:id',
[
        validarjWT,
        // isHaveRole('ADMIN'),
        check('id', 'El id no es valido').isMongoId(),
        check('tutor', 'El tutor no es valido').optional().isMongoId(),
        check(['entryTime', 'entryDeadline', 'departureTime'], 'La hora no es valida').optional().custom(isTimeValidate),
        validarCampos
], updateEnvironment)

router.delete('/delete-environment/:id',
[
        validarjWT,
        // isHaveRole('ADMIN'),
        check('id', 'El id no es valido').isMongoId(),
        validarCampos
], deleteEnvironment)

export default router