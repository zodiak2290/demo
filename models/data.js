'use strict';
var moment = require('moment');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var DataSchema = new mongoose.Schema({
	fecha: { type: Date, default: moment().tz("America/Mexico_City").format(), require:true },
	valor: { type:Number, required:true },
	comentarios: { type: String, default: "Sin comentarios" },
	categoria_id: { type: Schema.ObjectId, ref: 'Categoria', required: true}
});

DataSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Data' , DataSchema);

