const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Usuario, Produto } = require('../models/models');
const mongoose = require('mongoose');

function cifrarSenha(senha, salto) {
    const hash = crypto.createHmac('sha512', salto);
    hash.update(senha);
    return hash.digest('hex');
}

function gerarToken(payload) {
    const expiresIn = 120
    try {
        return jwt.sign(payload, process.env.SEGREDO)
    } catch (err) {
        throw new Exception('Erro ao gerar token');
    }
}

async function validarDados (req, res, next) {
    const usuario = new Usuario(req.body)
    try{
        await usuario.validate();
        next();
    } catch (err){
        res.status(422).json({ msg: 'Dados inválidos'});
    }
}
async function criar(req, res) {
    const salto = crypto.randomBytes(16).toString('hex');
    const senhaCifrada = cifrarSenha(req.body.senha, salto);
    const buscarUsuario = await Usuario.findOne({ email: req.body.email })
    if (buscarUsuario){
        return res.status(401).json({ msg: 'Usuário já cadastrado' })
    }
    try { 
        const novoUsuario = await Usuario.create({ email: req.body.email, senha: senhaCifrada, salto });
        return res.status(201).json(novoUsuario); 
    } catch (err) { 
        res.status(422).json({ msg: 'Dados do usuário inválidos' }); 
    }
}

async function deletar(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    try {
        await Usuario.findByIdAndDelete({_id: id});
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ msg: 'Usuario não encontrado' })
    }
}

async function cadastrarProdutos(req, res) {
    try {
        const novoProduto = await Produto.create(req.body);
        return res.status(201).json(novoProduto);
    } catch (err) {
        res.status(404).json({ msg: 'Dados do produto inválidos'})
    }
}

async function consultarProdutos(req, res) {
    const listaProdutos = await Produto.find({});
    try {
        res.status(201).json(listaProdutos);
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports = { criar, deletar, cadastrarProdutos, consultarProdutos, validarDados };