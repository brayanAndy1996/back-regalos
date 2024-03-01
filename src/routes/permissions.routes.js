import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, isHaveRole, validarjWT } from "../middlewares";
import { isValidatePermissionExist } from "../helpers/db-validators";
import { createPermission, getAllPermissions, updatePermission, deletePermission } from "../controllers/permissions.controller";

const router = Router()

router.get('/get-all-permissions', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    // validarCampos

],getAllPermissions)

router.post('/create-permission', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('code', 'El código es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('code').custom(isValidatePermissionExist),
    validarCampos
],createPermission)

router.put('/update-permission/:codeParam', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    validarCampos
],updatePermission)

router.delete('/delete-permission/:codeParam', 
[
    // validarjWT,
    // isHaveRole('ADMIN'),
    validarCampos
],deletePermission)

export default router