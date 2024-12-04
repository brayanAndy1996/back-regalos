import { Schema, model } from 'mongoose';

const MultimediaProductoSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre del producto es requerido'],
        unique: [ true, 'El nombre del producto es unico']
    },
    direccion: {
        type: String,
        required: true
    },
    //Si ES FOTO F, SI ES VIDEO V
    tipo: {
        type: String, 
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }

})

export default model('MultimediaProducto', MultimediaProductoSchema)