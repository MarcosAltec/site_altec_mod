const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    name: "atualizacao@altecmod.com",
    host: "mail.altecmod.com",
    service: "mail.altecmod.com",
    port: 465,
    secure: true,
    auth: {
        user: "atualizacao@altecmod.com",
        pass: 'Philco123@',
    },
});

transport.sendMail({
    from: 'Manual do dev <atualizacao@altecmod.com>',
    to: 'marcospassos1998@hotmail.com',
    subject: 'Enviando email com Nodemailer',
    html: '<h1>Olá, dev</h1> Esse email foi enviado da API',
    text: 'Olá, este email foi enviado da API',
})
.then((response) => console.log('Enviado com sucesso', response))
.catch((err) => console.log('Erro ao enviar', err));

transport.verify(function(error, success) {
    if (error) {
        console.log('Erro de configuração do transporte:', error);
    } else {
        console.log('Servidor pronto para enviar mensagens');
    }
});