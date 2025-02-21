import Usuarios from '../../models/users';
import { validateEmailFormat } from '../expression-regular';

const validateEmail = async ( email = '' ) => {
    if ( !email ) return
    if ( !validateEmailFormat( email ) ) throw new Error('El correo no tiene un formato válido')
        
    const existeEmail = await Usuarios.findOne({ email })
    if ( existeEmail )  throw new Error(`El correo ${ email } ya está registrado`)
}

const isValidateUserExist = async (nroDoc, { req }) => {
    const { tipoDoc } = req.body
    const existeUsuario = await Usuarios.findOne({ nroDoc, tipoDoc })
    if ( existeUsuario ) throw new Error(`El usuario con el documento ${ nroDoc } y tipo ${ tipoDoc } existe`)
}

const isValidateUserNoExist = async (_, { req }) => {
    const { nroDocParam, tipoDocParam } = req.params
    const existeUsuario = await Usuarios.findOne({ nroDoc: nroDocParam, tipoDoc: tipoDocParam })
    if ( !existeUsuario ) throw new Error(`El usuario con el documento ${ nroDocParam } y tipo ${ tipoDocParam } no existe`)
}

const isValidateUserExistById = async ( id ) => {
    const existeUsuario = await Usuarios.findById( id )
    if ( !existeUsuario ) throw new Error(`El usuario ${ id } no existe`)
}

const isValidateUserExistByEmail = async ( email ) => {
    const existeUsuario = await Usuarios.findOne({ email })
    if ( existeUsuario ) throw new Error(`El usuario con el correo:${ email } existe`)
}

const isValidateUserNoExistByEmail = async (_, { req }) => {
    const { email } = req.params
    const existeUsuario = await Usuarios.findOne({ email })
    if ( !existeUsuario ) throw new Error(`El usuario con el correo:${ email } no existe`)
}

export {
    validateEmail,
    isValidateUserNoExist,
    isValidateUserExist,
    isValidateUserExistById,
    isValidateUserExistByEmail,
    isValidateUserNoExistByEmail
}