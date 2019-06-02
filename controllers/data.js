'use strict'
//modelos
var Data = require('../models/data');
var moment = require('moment');

function create(req, res){
    var id_categoria = req.params.idcategoria;
    var params = req.body;
    if(params.valor){
      var data = new Data();
      data.valor = params.valor;
      if(params.fecha){
        data.fecha = params.fecha
      }
      if( params.comentarios ){
        data.comentarios = params.comentarios
      }
      data.categoria_id = id_categoria;
      data.save((err, dataStored) => {
        if(err){
          res.status(500).send({
            message: "No fue posible cargar data"
          });
        } else {
          if(!dataStored) {
            res.status(404).send({message: "La data no fue registrada"});
          } else {
            res.status(200).send({message: dataStored});
          }
        }
      });
    } else {
        res.status(500).send({message: "Faltan campos"});
    }
}



function getAll(req, res){
  let fechaIni = req.query.fechaIni || "2010-01-01";
  let fechaFin = req.query.fechaFin || "2020-02-01";
  let size = req.query.size || 10;
  let page = req.query.page || 0;
  let dateIni = new Date(moment(fechaIni));
  let dateFin = new Date( moment(fechaFin) );
console.log(size);
  Data.
      find({
          fecha: {
              $gte: dateIni,
              $lte: dateFin
          }
      })
      .limit( Number(size) )
      .skip(size * page)
      .sort({'fecha': 1})
      .exec(function(err, data) {
        if(err) {
            res.status(500).send( {
                message: "No fue posible obtener data"
            } );
        } else {
            if(!data) {
                res.status(404).send( {
                    message: "No tienes data cargada a esta categoria"
                } );
            } else {
              res.status(200).send( {
                  data: data
              } );
            }
        }
      });
  /*
    var params = req.query;
    let page = params.page || 1;
    let limit = parseInt(params.limit) || 10;

    Data.paginate({
      categoria_id: params.idcategoria
    }, {
        page: page,
        limit: limit,
        sort: {  },
        populate: 'categoria',
      }, function(err, data) {
        if(err) {
            res.status(500).send( {
                message: "No fue posible obtener data"
            } );
        } else {
            if(!data) {
                res.status(404).send( {
                    message: "No tienes data cargada a esta categoria"
                } );
            } else {
              res.status(200).send( {
                  data: data
              } );
            }
        }
    });*/
}


module.exports = {
	create, getAll
};
