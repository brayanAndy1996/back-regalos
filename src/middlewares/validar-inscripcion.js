import { response, } from 'express';
import Inscripcion from '../models/inscripcion';

const isInscripcionNoExist = async(req , res = response, next) =>{
    try {
        const { id } = req.params
        const inscripcion = await Inscripcion.findById( id )
        if( !inscripcion || !id || !inscripcion.estado ) {
            return res.status(400).json({
                errors: ['La inscripcion no existe']
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
    isInscripcionNoExist
}