import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    // errors.array() convierte el objeto de resultado en un array de objetos de error, donde cada objeto de error tiene detalles sobre un error de validación específico.
    const errorsMessage = errors.array()?.map(error => error.msg);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errorsMessage});
    }
    next();
}

export {
    validarCampos
}