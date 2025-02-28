const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    name: 'Altec Mod',
    host: 'mail.altecmod.com',
    service: 'mail.altecmod.com',
    port: 465,
    secure: true, // true para usar SSL/TLS
    auth: {
        user: 'atualizacao@altecmod.com',
        pass: 'Philco123@'
    }
});

const sendVerificationCode  = async (email, codigo) => {
    const mailOptions = {
        from: 'Verificação de Email<atualizacao@altecmod.com>', // Seu e-mail
        to: email,
        subject: 'Código de verificação',
        html: `<h2>Seu código de verificação</h2><h1>${codigo}</h1>`,
        text: `Seu código de verificação: ${codigo}`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail de verificação enviado para', email);
    } catch (error) {
        console.error('Erro ao enviar e-mail de verificação:', error);
        throw error;
    }
};

module.exports = { sendVerificationCode };
