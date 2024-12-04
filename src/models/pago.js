import { Schema, model } from 'mongoose';

const PagoSchema = Schema({
    monto: {
        type: Number,
        required: [ true, 'La orden necesita un monto']
    },
    // pagado, no pagado
    estado: {
        type: String,
        required: [ true, 'La orden necesita un monto']
    }, 
    fecha: {
        type: Date,
        default: Date.now
    },
    //El usuario que hace el cobro
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    orden: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }

})

export default model('Pago', PagoSchema)