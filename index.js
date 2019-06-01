'use strict';

var mongoose =  require('mongoose');

var app = require("./app");
var port = 3789;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://albon2290:123456789_@cluster0-e1lgw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
	.then(() => {
		let puerto = process.env.PORT || port;
		console.log('Conexxion exitosa en puerto: ' + puerto );
		app.listen(puerto, () =>{
			console.log("servido ok");
		});
	}).catch(err => console.log(err));
