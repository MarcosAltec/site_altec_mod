const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/useController');

router.post('/register', registerUser);

module.exports = router;
