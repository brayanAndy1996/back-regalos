import { Schema, model } from 'mongoose';

const PlanSchema = Schema({
    name: {
        type: String,
        required: true
    },
    precio : {
        type: String,
        required: true
    },
    description : String,
    duration: {
        type: Number,
        required: true
    },
    ambiente: [{
        type: Schema.Types.ObjectId,
        ref: 'Environment',
        required: true
    }],
    implementos:[{
        type: Schema.Types.ObjectId,
        ref: 'Implementos'
    }]
})

export default model('Plan', PlanSchema)