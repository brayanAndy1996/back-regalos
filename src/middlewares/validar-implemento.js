import { response, } from 'express';
import Implemento from '../models/implemento';

const isImplementoNoExist = async(req , res = response, next) =>{
    try {
        const { id } = req.params
        const implemento = await Implemento.findById( id )
        if( !implemento || !id || !implemento.estado ) {
            return res.status(400).json({
                errors: ['El implemento no existe']
            })
        }
        next()
    } catch (error) {
        console.log("🚀 ~ isImplementoNoExist ~ error:", error)
        let errors = []
        if( error.kind === 'ObjectId' ) errors.push('El id pasado no es uno válido')
        else errors.push('Hubo un error')
        res.status(500).json({
            errors: errors
        })
    }
}

export {
    isImplementoNoExist
}