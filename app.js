'use strict';

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
//Rutas
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var data_routes = require('./routes/data');

//middleware bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//base rutas
app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', data_routes);

module.exports = app;
