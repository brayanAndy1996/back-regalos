import { response, request } from 'express';
import jwt from 'jsonwebtoken'
import Usuario from '../models/users';

const validarjWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        const usuario = await Usuario.findById(uid)
        //si el usuario existe
        if(!usuario){
            return res.status(401).json({
                msg:'Usuario no existe'
            })
        }
        if(!usuario.estado){
            return res.status(200).json({
                msg:'El usuario ya fue eliminado'
            })
        }
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}

export {
    validarjWT
}