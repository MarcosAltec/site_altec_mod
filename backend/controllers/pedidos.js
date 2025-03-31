const { Pedido } = require('../models/pedido');
const { Produto } = require('../models/produto');
const { Usuario } = require('../models/usuario');

async function buscarPedidos(req, res) {
    // console.log("BACK PED 1", req.query.cliente)
    const usuario = await Usuario.findOne({ email: req.query.cliente.email })
    // console.log("BACK PED 2", usuario);
    try {
        const pedidos = await Pedido.find({ usuario_id: usuario._id });
        // console.log("BACK PED PEDIDO", pedidos);
        const lista = []

        if (pedidos.length === 0) {
            return res.status(404).json({ msg: 'Não foi encontrado pedidos para este usuário!'});
        }

        for(let i = 0; i < pedidos.length; i++) {
            const buscarProduto = await Produto.findOne({ _id: pedidos[i].produto_id }).select('-_id nome_mod codigo preco sobre_o_mod link_download');
            lista.push(buscarProduto);
        }
        return res.status(200).json(lista)
        
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedidos', erro: err });
    }
};

async function criarPedido (req, res) {
    // console.log("TENTAR CADASTRAR PED", req.body);
    const buscarProduto = await Produto.findOne({ codigo: req.body.number}).select('nome_mod preco')
    const buscarUsuario = await Usuario.findOne({ email: req.body.email}).select('email')
    if (!buscarProduto || !buscarUsuario) {
        return res.status(404).json({ msg: 'Produto ou Usuário não encontrado!' });
    }
    try {
        const novoPedido = await Pedido.create({ 
            usuario_id: buscarUsuario._id,
            produto_id: buscarProduto._id,
            preco_comprado: buscarProduto.preco
        });
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(400).json({ msg: 'Não foi possível cadastrar o pedido' });
    }
}

module.exports = { buscarPedidos, criarPedido };