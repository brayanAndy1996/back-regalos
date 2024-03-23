import { Schema, model } from 'mongoose';

const AssistanceSchema = Schema({
    environment: {
        type: Schema.Types.ObjectId,
        ref: 'Environment'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    checker: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model( 'Assistance', AssistanceSchema )