var express = require('express');
var router = express.Router();
const controller = require('../controllers/usuarios');
const validarToken = require('../middlewares/auth')

router.post('/usuarios', controller.validarDados, controller.criar);
router.post('/login', controller.entrar);
router.post('/recuperar-email', controller.recuperarEmail);
router.delete('/usuarios/:id', controller.deletar);
router.get('/validar-token', validarToken, controller.acessarViaToken);
router.post('/email-temp', controller.tempEmail);
router.get('/validar-codigo', controller.validarEmail);
router.get('/buscar-cliente', controller.localizarCliente);
router.post('/nova-senha', controller.novaSenha);

module.exports = router;
