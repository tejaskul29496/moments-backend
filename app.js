const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const route = require("./route");

const app = express();

var corsOptions = {
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['lang_id', 'ee_id', 'clientsid', 'X-Requested-With', 'x-access-token', 'Content-Type', 'Authorization']
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/", route);

module.exports = app;