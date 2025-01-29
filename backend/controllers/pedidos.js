const { Pedido } = require('../models/pedido');

async function meusPedidos(req, res) {
    const usuarioId = req.usuario.id;
    try {
        const pedidos = await Pedido.find({ usuario_id: usuarioId }).populate('produto_id', );
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedidos', erro: err });
    }
}

module.exports = { meusPedidos };