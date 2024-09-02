import { Schema, model } from 'mongoose';

const UsersSchema = Schema({
    nroDoc: {
        type: String,
        required: true
    },
    tipoDoc: {
        type: String,
        required: true
    },
    nombreCom: {
        nombre: {
            type: String,
            required: true
        },
        apellidoPat: {
            type: String,
            required: true
        },
        apellidoMat: {
            type: String,
            required: true
        }
    },
    email: {
        type: String
    },
    password: {
        type: String,
        select: false,
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    fechaNac: {
        type: Date
    },
    sexo: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    //Este campo verifica si esta inscrito o ya se vencio
    isRegister:{
        type: Boolean,
        default: true,
        required: true
    },
    ambienteActual: [{
        type: Schema.Types.ObjectId,
        ref: 'Environment',
        required: true
    }],
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
})
UsersSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    return {...user, uid: _id}
}

export default model( 'Users', UsersSchema ); // This line is not necessary