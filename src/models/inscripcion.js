import { Schema, model } from 'mongoose';

const InscripcionSchema = Schema({
    precio : {
        type: String,
        required: true
    },
    //En meses
    duration: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaInscrita: {
        type: Date,
        default: Date.now
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    //Persona quien inscribio 
    matriculo: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    ambiente: {
        type: Schema.Types.ObjectId,
        ref: 'Environment',
        required: true
    },
    implementos:[{
        type: Schema.Types.ObjectId,
        ref: 'Implemento',
        status: {
            type: Boolean,
            default: true,
            required: true
        }
    }]
})

export default model('Inscripcion', InscripcionSchema)