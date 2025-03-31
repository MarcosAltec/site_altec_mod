const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome_mod: { type: String, required: true},
    codigo: { type: Number, required: true},
    preco: { type: String, required: true},
    link_foto: { type: String, required: true},
    demais_fotos: { type: [String], required: true},
    sobre_o_mod: { type: String, required: true},
    carroceria: { type: String, required: true},
    chassis: { type: [String], required: true},
    motor: { type: [String], required: true},
    transmissao: { type: [String], required: true},
    interior: { type: String, required: true},
    link_download: { type: String, required: true},
    link_compra: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Produto = mongoose.model('Produto', productSchema);

module.exports = { Produto }