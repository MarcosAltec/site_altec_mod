var express = require('express');
var router = express.Router();
const controller = require('../controllers/controlles');

router.post('/usuarios', controller.validarDados, controller.criar);
router.post('/login', controller.entrar);
router.delete('/usuarios/:id', controller.deletar);
router.post('/produtos', controller.cadastrarProdutos);
router.get('/produtos', controller.consultarProdutos);

module.exports = router;
