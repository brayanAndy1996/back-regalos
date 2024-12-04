import { Schema, model } from 'mongoose';

const CarritoSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]

})

export default model('Carrito', CarritoSchema)