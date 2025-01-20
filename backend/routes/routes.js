var express = require('express');
var router = express.Router();
const controller = require('../controllers/controlles');

router.post('/usuarios', controller.criar);

module.exports = router;
