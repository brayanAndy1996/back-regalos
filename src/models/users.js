import { Schema, model } from 'mongoose';

const UsuariosSchema = Schema({
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
        type: String
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
    ambiente: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }],
})
UsuariosSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    return {...user, uid: _id}
}

export default model( 'Usuarios', UsuariosSchema ); // This line is not necessary