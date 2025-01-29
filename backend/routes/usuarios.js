var express = require('express');
var router = express.Router();
const controller = require('../controllers/usuarios');

router.post('/usuarios', controller.validarDados, controller.criar);
router.post('/login', controller.entrar);
router.delete('/usuarios/:id', controller.deletar);

module.exports = router;
