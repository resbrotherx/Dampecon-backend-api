const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

router.post('/login', login);
// register should be disabled in production; use seed or one-off
router.post('/register', register);

module.exports = router;
