var express = require('express');
var router = express.Router();
const controller = require('../controllers/usuarios');
const validarToken = require('../middlewares/auth')

router.post('/usuarios', controller.validarDados, controller.criar);
router.post('/login', controller.entrar);
router.delete('/usuarios/:id', controller.deletar);
router.get('/validar-token', validarToken, controller.acessarViaToken);

module.exports = router;
