const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.altecmod.com',
    port: 465,
    secure: true, // true para usar SSL/TLS
    auth: {
        user: 'atualizacao@altecmod.com', // Seu e-mail
        pass: 'Philco123@' // Sua senha de e-mail
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'atualizacao@altecmod.com', // Seu e-mail
        to: 'marcospassos2211@gmail.com',
        subject: subject, // Assunto do e-mail
        text: text // Corpo do e-mail
    };

    return transporter.sendMail(mailOptions)
    .then((info) => {
        console.log('E-mail enviado:', info.response);
    })
    .catch((error) => {
        console.error('Erro ao enviar e-mail:', error);
    });
};

module.exports = {
    sendEmail
};
