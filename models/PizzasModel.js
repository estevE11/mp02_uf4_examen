const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v.length <= 20;
            },
            message: 'El nombre no puede tener una longitud mayor a 20 caracteres'
        }
    },
    precio: {
        type: Number,
        required: true,
        min: [1, 'El nombre no puede ser mayor a 20 caracteres']
    },
    vegetariana: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v == 'si' || v == 'no';
            },
            message: 'El genero debe ser "si" o "no"'
        }
    },
    restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurante',
        required: true
    },
});

schema.virtual('precioIVA').get(function () {
    const val = this.precio * 1.21;
    return Math.round((val + Number.EPSILON) * 100) / 100;
});

module.exports = mongoose.model('pizzas', schema);