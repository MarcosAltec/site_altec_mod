const { sendEmail } = require('../services/emailServices');

const registerUser = async (req, res) => {
    const { email, senha } = req.body;
    // Lógica de registro do usuário (salvar no banco de dados, etc.)

    // Enviar e-mail de verificação
    const subject = 'Verificação de E-mail';
    const text = 'Este é um teste de e-mail para verificação!';
    try {
        await sendEmail(email, subject, text);
        res.status(200).json({ msg: 'E-mail de verificação enviado!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao enviar e-mail', error });
    }
};

module.exports = {
    registerUser
};
