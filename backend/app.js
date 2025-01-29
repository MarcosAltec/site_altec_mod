require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const routerApidocs = require('./routes/apidocs');
const usersRouter = require('./routes/usuarios');
const productRouter = require('./routes/produtos')

var app = express();

mongoose.connect(process.env.MONGODB_URL);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/api-docs', routerApidocs);
app.use('/', usersRouter);
app.use('/produtos', productRouter)

module.exports = app;


// const corsOptions = {
//     origin: 'http://localhost:5173/',
//     methods: 'GET,PUT,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204
// }
