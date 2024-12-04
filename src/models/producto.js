import { Schema, model } from 'mongoose';

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        max: 200
    },
    stock: {
        type: Number,
        required: true
    },
    porcentajeDescuento:Number,
    estado: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }

})

export default model('Producto', ProductoSchema)