'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
//modelos
var User = require('../models/user');
var Token = require('../models/token');

//service jqt
var jwt = require('../services/jwt');

function save(params, req, res){
	if(params.pass){
			var user = new User();
	    user.name = params.name;
	    user.email = params.email;
	    user.username = params.username;
	    bcrypt.hash(params.pass, null, null, function(err, hash){
	    	user.pass = hash;

				user.save((err, userStored) => {
		    	if(err){
		    		res.status(500).send({
		    			message: "Error 500"
		    		});
		    	} else {
		    		if(!userStored) {
		    			res.status(404).send({message: "Usuario no registrado"});
		    		} else {
							let newUser= {};
							newUser.name = userStored.name;
							newUser.email = userStored.email;
							newUser.username = userStored.username;
							newUser._id = userStored._id;
		    			res.status(200).send({newUser});
		    		}
		    	}
		    });

	    });
			//res.status(500).send({message: user});
    } else {
    	res.status(500).send({message: 'Falta contraseña'});
    }
}

function saveUser(req, res) {
	var params = req.body;
	if( params.email && params.pass && params.username ){
		User.findOne( { email: params.email.toLowerCase() }, (err, user) =>{
				if(err){
					res.status(404).send({message: "Error al tratar de recuperar al usuario"});
				} else{
					if(!user) {
						save(params, req, res);
					} else {
						res.status(200).send({message: "El usuario ya ha sido registrado anteriormente"});
					}
				}
			});
		} else {
			res.status(404).send({ message: "Email , contraseña y nombre de usuario requeridos requeridos" })
		}
}

function updateUser(req, res){
		var userId = req.params.id;
		var update = req.body;
/*
		if( userId != req.user.sub ) {
				return res.status(404).send({
						message: req.user,
						id: userId
				});
		}*/
		if( update.pass ) {
			bcrypt.hash(update.pass, null, null, function(err, hash){
	    	update.pass = hash;
				User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
						edit(userId, update, req, res);
				});
	    });
		} else {
				edit(userId, update, req, res);
		}
}

function edit(userId, update, req, res){
	User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
			if(err){
					res.status(500).send({
							err
					});
			} else {
					if(!userUpdated){
							res.status(404).send( {
									message: "No se ha podido actualizar"
							} );
					} else {
						res.status(200).send( {
								user: userUpdated
						} );
					}
			}
	});
}

function login(req, res){
	var params = req.body;
	var email = params.email;
	var pass = params.pass;
	User.findOne( {
									email: email.toLowerCase()
								}, (err, user) =>{
		if(err){
			res.status(404).send({message: "Error al tratar de recuperar al usuario"});
		} else{
			if(!user) {
				res.status(404).send({message: "Usuario no registrado"});
			} else {
				console.log("validando")
				bcrypt.compare(pass, user.pass, (err, check) =>  {
						if(check){
								if(params.token){
										var token = jwt.createToken(user);
										var tokenModel = new Token();
										tokenModel.token = token;
										tokenModel.usuario_id = user._id;
										tokenModel.save((err, token) => {
											if (err){
												res.status(404).send({message: "NO fue posible generar el token"});
											} else {
												res.status(200).send({
													token: jwt.createToken(user)
												});
											}
											  // saved!
										});
								} else {
										res.status(200).send({user: user});
								}
						} else {
								res.status(404).send({message: "Email o contraseña incorrectos"});
						}
				});
			}
		}
	});
}

module.exports = {
	saveUser, login, updateUser
};
