'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = Schema({
	token: { type : String , unique : true, required : true },
	usuario_id: { type: Schema.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Token' , TokenSchema);
