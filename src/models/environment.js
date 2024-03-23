import { Schema, model } from 'mongoose';

const EnvironmentSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    entryTime: {
        type: Date
    },
    entryDeadline: {
        type: Date
    },
    departureTime: {
        type: Date
    },
    area: {
        type: String
    },
    location: {
        type: String
    },
    tutor:[{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }]
})

export default model('Environment', EnvironmentSchema)