'use strict';

var mongoose =  require('mongoose');

var app = require("./app");
var port = 3789;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://albon2290:123456789_@cluster0-e1lgw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
	.then(() => {
		console.log('Conexxion exitosa');
		app.listen(port, () =>{
			console.log("servido ok");
		});
	}).catch(err => console.log(err));
