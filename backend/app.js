require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const routerApidocs = require('./routes/apidocs');
const usersRouter = require('./routes/usuarios');
const productRouter = require('./routes/produtos');
const orderRouter = require('./routes/pedidos');

var app = express();

mongoose.connect(process.env.MONGODB_URL);

const corsOptions = {
    origin: 'https://teste.altecmod.com/', // Adicione a URL do seu frontend aqui
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
  
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', routerApidocs);
app.use('/', usersRouter);
app.use('/produtos', productRouter);
app.use('/pedidos', orderRouter);

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Backend funcionando! 🚀");
});