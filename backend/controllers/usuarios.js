const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Usuario } = require('../models/usuario');
const { TempUser } = require('../models/emailTemp');
const { sendVerificationCode } = require('../services/emailServices')

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
        const novoUsuario = await Usuario.create({ nome: req.body.nome, email: req.body.email, senha: senhaCifrada, salto });
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
                nome: usuarioEncontrado.nome,
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

    if (usuarioEncontrado) {
        res.status(201).json({
            nome: usuarioEncontrado.nome,
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

function geradorDeCodigo() {
    let code = '';
    code += Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }    
    return code;
}

async function tempEmail(req, res) {
    const codigo = geradorDeCodigo();
    const buscarUsuario = await Usuario.findOne({ email: req.body.email })
    if (buscarUsuario){
        return res.status(401).json({ msg: 'Usuário já cadastrado' })
    }
    try {
        const novoEmailTemp = await TempUser.create({ email: req.body.email, codigo: codigo });
        console.log("TESTE EMAIL", novoEmailTemp.email)
        // await sendVerificationCode(novoEmailTemp.email, codigo)
        res.status(201).json(novoEmailTemp.email);
    } catch (err) {
        res.status(500).json({msg: "Falha ao cadastrar usuário temporário"});
    }
}

async function validarEmail(req, res) {
    const email = req.query.email;
    const codigo = req.query.codigo;
    const usuarioEncontrado = await TempUser.findOne({ email: email });
    if (usuarioEncontrado) {
        if(usuarioEncontrado.email == email && usuarioEncontrado.codigo == codigo){
            res.status(201).json(usuarioEncontrado.email);
        } else {
            res.status(401).json({ msg: "Falha na validação, código inválido."})
        }
    } else {
        res.status(404).json({ msg: "Usuário não encontrado."})
    }
}

async function localizarCliente(req, res) {
    
    const cliente = await Usuario.findOne({ email: req.query.email });
    if (cliente) {
        res.status(200).json({ id: cliente._id, nome: cliente.nome, email: cliente.email });
    } else {
        res.status(404).json({ msg: "Usuário não encontrado." })
    }
};

async function recuperarEmail(req, res) {
    const codigo = geradorDeCodigo();
    const cliente = await Usuario.findOne({ email: req.body.email});
    
    if (cliente) {
        console.log("CLIENTE OK", cliente.email, codigo)
        await TempUser.create({ email: cliente.email, codigo: codigo });
        // await sendVerificationCode(cliente.email, codigo)
        res.status(200).json(cliente.email)
    } else {
        res.status(404).json({ msg: "Email não cadastrado" });
    }
};

async function novaSenha(req, res) {
    console.log("REQ SENHA", req.body)
    const usuario = await Usuario.findOne({ email: req.body.email })
    console.log("REQ SENHA USUSARIO", usuario);
    if (usuario) {
        const salto = crypto.randomBytes(16).toString('hex');
        const senhaCifrada = cifrarSenha(req.body.senha, salto);
        usuario.senha = senhaCifrada;
        usuario.salto = salto;
        await usuario.save();

        res.status(200).json({ msg: 'Senha atualizada com sucesso!' });
    } else {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ msg: 'Erro no servidor ao redefinir senha' });
    }
    return "RES DO BACK"
}

module.exports = { criar, deletar, validarDados, entrar, acessarViaToken, tempEmail, validarEmail, localizarCliente, recuperarEmail, novaSenha };