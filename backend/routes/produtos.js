var express = require('express');
var router = express.Router();
const controller = require('../controllers/produtos');

router.post('/', controller.cadastrarProdutos);
router.get('/', controller.consultarProdutos);
router.get('/id', controller.consultarProduto);

module.exports = router;