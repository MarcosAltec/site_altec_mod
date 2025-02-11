const { Produto } = require('../models/produto');

async function cadastrarProdutos(req, res) {
    try {
        const novoProduto = await Produto.create(req.body);
        return res.status(201).json(novoProduto);
    } catch (err) {
        res.status(404).json({ msg: 'Dados do produto inválidos'})
    }
}

async function consultarProdutos(req, res) {
    const listaProdutos = await Produto.find({}).select('-link_download');
    try {
        // console.log('LISTA PRODUTOS', listaProdutos)
        res.status(201).json(listaProdutos);
    } catch (err) {
        res.status(404).json(err);
    }
}

async function consultarProduto(req, res) {
    const codigo = req.query.codigo
    const produto = await Produto.findOne({ codigo: codigo}).select('-link_download');
    if (produto) {
        // console.log("FFFF")
        return res.status(201).json(produto);
    } else {
        // console.log("JJJJ")
        return res.status(404).json({ msg: "Produto não encontrado"})
    }
}

module.exports = { cadastrarProdutos, consultarProdutos, consultarProduto };