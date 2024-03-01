import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
    }]
    
})

export default model('Role', RoleSchema)