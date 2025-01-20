const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/models')

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

async function criar(req, res) {
    const salto = crypto.randomBytes(16).toString('hex');
    const senhaCifrada = cifrarSenha(req.body.senha, salto);
    try { 
        const novoUsuario = await Usuario.create({ email: req.body.email, senha: senhaCifrada, salto });
        return res.status(201).json(novoUsuario); 
    } catch (err) { 
        res.status(422).json({ msg: 'Dados do usuário inválidos' }); 
    }

    //const novoUsuario = await Usuario.create({email: req.body.email, senha: senhaCifrada, salto});
    //res.status(201).json(novoUsuario);
}

module.exports = {criar};