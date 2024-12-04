import { Schema, model } from 'mongoose';

const UsersSchema = Schema({
    nombreCom: {
        nombre: {
            type: String,
            required: [true, 'El nombre es requerido']
        },
        apellidoPat: {
            type: String
        },
        apellidoMat: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'El email es único']
    },
    password: {
        type: String,
        select: false,
        required: [true, 'La contraseña es requerida']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    productsFavorites:[{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
})
UsersSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    return {...user, uid: _id}
}

export default model( 'Users', UsersSchema ); // This line is not necessary