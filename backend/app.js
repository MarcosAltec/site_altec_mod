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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://teste.altecmod.com', // Permite apenas esta origem
    methods: ['GET', 'POST', 'PUT'], // Permite apenas GET e POST
    allowedHeaders: ['Content-Type', 'Authorization'], // Define os cabeçalhos permitidos
};

app.use(cors(corsOptions));

app.use('/api-docs', routerApidocs);
app.use('/', usersRouter);
app.use('/produtos', productRouter);
app.use('/pedidos', orderRouter);

module.exports = app;

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

// const corsOptions = {
//     origin: 'http://localhost:5173/',
//     methods: 'GET,PUT,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204
// }
