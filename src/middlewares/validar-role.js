import { response } from "express";

const isHaveRole = (...roles) => {
    return (req, res = response, next) => {
        const rolesUser = new Set(req.usuario.role)
        const intersection = new Set([...roles].filter((x) => rolesUser.has(x)));
        if (intersection.has(0)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

export {
    isHaveRole
}