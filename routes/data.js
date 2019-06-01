'use strict'

var express = require('express');
var DataController = require('../controllers/data');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/categoria/:idcategoria/data', md_auth.ensureAuth, DataController.create);
api.get('/data/:page?*/:idcategoria?*', md_auth.ensureAuth, DataController.getAll);

module.exports = api;