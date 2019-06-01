'use strict'
//modelos
var Categoria = require('../models/categoria');

function create(req, res){
    var params = req.body;
    Categoria.findOne(
      {
        nombre: params.nombre.toLowerCase(),
      }, (err, categoria) =>{
          if(err){
            res.status(404).send({message: err});
          } else{
            if(!categoria) {
                var categoria = new Categoria();
                categoria.nombre = params.nombre.toLowerCase();
                categoria.descripcion = params.descripcion;
                categoria.save((err, categoriaStored) => {
                  if(err){
          	    		res.status(500).send({
          	    			message: err
          	    		});
          	    	} else {
          	    		if(!categoriaStored) {
          	    			res.status(404).send({message: "La categoria no fue registrada"});
          	    		} else {
          	    			res.status(200).send({categoria: categoriaStored});
          	    		}
          	    	}
          	    });
            } else {
                res.status(200).send({message: "La categoria ya existe"});
            }
          }
    });

}


function getAll(req, res){
    var params = req.query;
    let page = params.page || 1;
    let limit = parseInt(params.limit) || 10;
    Categoria.paginate({
    }, {
        page: page,
        limit: limit,
        sort: { 'nombre': 1 }
      }, function(err, categorias) {
        if(err) {
            res.status(500).send( {
                message: err
            } );
        } else {
            if(!categorias) {
                  res.status(404).send( {
                    message: "No tienes categorias cargadas"
                } );
            } else {
              res.status(200).send( {
                  categorias: categorias
              } );
            }
        }
    });
}

module.exports = {
	create, getAll
};
