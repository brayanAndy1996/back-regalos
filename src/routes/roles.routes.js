import { Router } from "express";
import { check } from "express-validator";
import { createRole, updateRole, deleteRole, getAllRoles } from "../controllers/roles.controller";
import { validarCampos, isHaveRole, validarjWT} from "../middlewares";
import { isValidateRoleExist } from "../helpers/db-validators";

const router = Router()

router.get('/get-all-roles',
[
    validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos

], getAllRoles)

router.post('/create-role', 
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('code', 'Los codigos son obligatorios').not().isEmpty(),
    check('permissions', 'Los permisos no son validos').optional().isMongoId(),
    check('code').custom(isValidateRoleExist),
    validarCampos
],createRole)

router.put('/update-role/:codeParam',
[
    validarjWT,
    // isHaveRole('ADMIN'),
    check('permissions', 'Los permisos no son validos').optional().isMongoId(),
    validarCampos
], updateRole)

router.delete('/delete-role/:codeParam', 
[
    validarjWT,
    // isHaveRole('ADMIN'),
    validarCampos
], deleteRole)

export default router