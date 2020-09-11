'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; 

var router = require('./routes/index.js');
app.use(bodyParser.json());
app.use('/', router);

// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(80, () => {
    console.log("Api works!")
});
