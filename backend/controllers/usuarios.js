const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Usuario } = require('../models/usuario');
const { buscarPedidos } = require('../controllers/pedidos');

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

async function entrar(req, res) {
    const usuarioEncontrado = await Usuario.findOne({ email: req.body.email });

    if (usuarioEncontrado) {
        const senhaCifrada = cifrarSenha(req.body.password, usuarioEncontrado.salto);

        if (usuarioEncontrado.senha === senhaCifrada) {
            const token = jwt.sign({ email: usuarioEncontrado.email}, process.env.SEGREDO, { expiresIn: '1m'})
            res.status(200).json({
                token, 
                email: usuarioEncontrado.email,
                id: usuarioEncontrado._id
             });
        } else {
            res.status(401).json({ msg: 'acesso negado' });
        }
    } else {
        res.status(400).json({ msg: 'credenciais invalidas' });
    }
}

async function acessarViaToken(req, res) {
    const usuarioEncontrado = await Usuario.findOne({ email: req.headers.email });
    console.log('ACESSO VIA TOKEN', req.headers.email, usuarioEncontrado)

    if (usuarioEncontrado) {
        res.status(201).json({
            email: usuarioEncontrado.email,
            id: usuarioEncontrado._id
        })
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

module.exports = { criar, deletar, validarDados, entrar, acessarViaToken };