const express = require('express');
const authApi = require('../controllers/authCntr');
const router = express.Router();

router.post('/',[authApi.login]);

module.exports = router;