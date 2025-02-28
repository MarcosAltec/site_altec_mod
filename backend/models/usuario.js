const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }, 
    senha: {
        type: String,
        required: true,
        minLength: 6
    },
    salto: String
});

const Usuario = mongoose.model('Usuario', userSchema);


module.exports = { Usuario }