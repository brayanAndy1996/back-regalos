import { Schema, model } from 'mongoose';

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre de la categoria es requerido'],
        unique: [ true, 'El nombre de la categoria es unico']
    },
    descripcion: {
        type: String,
        max: [200, 'La descripción debe tener como maximo 200 caracteres']
    },
    modulo: {
        type: String,
        required: [ true, 'El nombre del modulo es requerido']
    },
    icono: {
        type: String,
        required: [ true, 'La nombre del icono es requerida']
    }

})

export default model('Categoria', CategoriaSchema)