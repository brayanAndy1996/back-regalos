import { Schema, model } from 'mongoose';

const MovProductoSchema = Schema({
    cantidad : {
        type: Number,
        required: [true, 'Se necesita una cantidad']
    },
    //adicionar,disminuir
    tipoMovimiento: {
        type: String,
        required: [true, 'Se necesita un tipo de movimiento']
    },
    fechaMovimiento: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Se necesita un usuario']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'Se necesita un producto']
    }
})

export default model('MovProducto', MovProductoSchema)