import { response } from "express";
import { validateTelefonoFormat } from "../helpers/expression-regular";

const validarSizeTelefono = (req, res = response, next) => {
    const { telefono } = req.body;
    if (!telefono)  return next();
    if (!validateTelefonoFormat(telefono)) {
        return res.status(400).json({
            errors: ['El teléfono debe tener 9 dígitos']
        })
    }
    next();
}

export {
    validarSizeTelefono
}