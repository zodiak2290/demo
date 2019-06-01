'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	pass: String,
	email: { type : String , unique : true, required : true },
	username: { type : String , unique : true, required : true },
});

module.exports = mongoose.model('User' , UserSchema);
