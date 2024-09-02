import { Schema, model } from 'mongoose';

const MovImplementoSchema = Schema({
    cantidad : {
        type: Number,
        required: true
    },
    //adicionar,disminuir
    tipoMovimiento: {
        type: String,
        required: true
    },
    fechaMovimiento: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    implemento: {
        type: Schema.Types.ObjectId,
        ref: 'Implemento',
        required: true
    }
})

export default model('MovImplemento', MovImplementoSchema)