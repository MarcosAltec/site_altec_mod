const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    nome_mod: { type: String, required: true},
    codigo: { type: Number, required: true},
    preco: { type: Number, required: true},
    data_compra: { type: Date, required: true},
    link_download: { type: String, required: true},
    info_mod: { type: String, require: true}
})

const Pedido = mongoose.model('Pedido', orderSchema);

module.exports = { Pedido };