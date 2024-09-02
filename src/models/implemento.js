import { Schema, model } from 'mongoose';

const ImplementoSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    precio : {
        type: Number,
        required: true
    },
    description : String,
    stock: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

export default model('Implemento', ImplementoSchema)