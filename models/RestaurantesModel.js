const mongoose = require('mongoose');

module.exports = mongoose.model('restaurante', mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}));