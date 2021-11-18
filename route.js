const express = require('express');
const app = express();

const authApi = require('./api/authApi');
const registerApi = require('./api/registerApi');
const momentsApi = require('./api/momentsApi.js');

app.use('/login', authApi);
app.use('/register', registerApi);
app.use('/moments', momentsApi)

module.exports = app;