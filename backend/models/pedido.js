const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true},
    produto_id: { type: String, required: true},
    data_pedido: { type: Date, default: Date.now},
    preco_comprado: { type: Number, required: true}
})

const Pedido = mongoose.model('Pedido', orderSchema);

module.exports = { Pedido };