var express = require('express');
var router = express.Router();
const controller = require('../controllers/pedidos');

router.post('/', controller.criarPedido);
router.get('/', controller.buscarPedidos);

module.exports = router;