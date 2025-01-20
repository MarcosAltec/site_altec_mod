const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true }, 
    senha: { type: String, required: true},
    salto: String
});

module.exports = mongoose.model('Usuarios', userSchema);