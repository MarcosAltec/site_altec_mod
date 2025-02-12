const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "mail.altecmod.com",
    port: 465,
    secure: true,
    auth: {
        user: "atualizacao@altecmod.com",
        pass: 'Philco123@',
    },
    // debug: true,
    // logger: true

});

transport.sendMail({
    from: 'Manual do dev <atualizacao@altecmod.com>',
    to: 'atualizacao@altecmod.com, marcospassos1998@hotmail.com, marcospassos2211@gmail.com, marcos.passos@iesb.edu.br',
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