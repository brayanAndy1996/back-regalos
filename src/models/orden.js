import { Schema, model } from 'mongoose';

const OrdenSchema = Schema({
    monto: {
        type: Number,
        required: [ true, 'La orden necesita un monto']
    },
    // sin entregar, entregado, el estado "pagado se va dar cuando haya un pago relacionado con esta orden"
    estado: {
        type: String,
        required: [ true, 'La orden necesita un monto']
    }, 
    fecha: {
        type: Date,
        default: Date.now
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    productos: [{
        refProducto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            required: true
          },
          precio: {
            type: Number,
            required: true
          }
    }]

})

export default model('Orden', OrdenSchema)