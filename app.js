'use strict';
require('dotenv').config({path:__dirname+'/.env'})
var express = require('express');
const config = require('./config.js');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
module.exports = app;
app.use(cors())
var router = require('./routes/index.js');
app.use(bodyParser.json());
app.use('/v1', router);

// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(config.PORT, () => {
    console.log("Api works!")
});
