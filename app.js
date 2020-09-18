'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
module.exports = app;
app.use(cors())

var router = require('./routes/index.js');
app.use(bodyParser.json());
app.use('/v1', router);

// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(9100, () => {
    console.log("Api works!")
});
