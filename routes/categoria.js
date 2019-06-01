'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/categoria', md_auth.ensureAuth, CategoriaController.create);
api.get('/categoria/:page?*/:limit?*', md_auth.ensureAuth, CategoriaController.getAll);

module.exports = api;
