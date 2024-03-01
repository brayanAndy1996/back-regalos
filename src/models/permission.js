import { Schema, model } from 'mongoose';

const PermissionSchema = Schema({
    name: {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    }
})

export default model('Permission', PermissionSchema)