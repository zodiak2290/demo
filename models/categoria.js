'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CategoriaSchema = new mongoose.Schema({
	nombre: { type : String, required : true },
	descripcion: { type: String, default: "Sin descripcion" },
	icon: { type: String, default: "glyphicon glyphicon-th" },
});

CategoriaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Categoria' , CategoriaSchema);
