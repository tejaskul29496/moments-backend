const express = require('express');
const registerApi = require('../controllers/registerCntr');
const router = express.Router();

router.post('/',[registerApi.register]);

module.exports = router;