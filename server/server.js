var path = require('path')
var express = require('express');
var app = express();
var db = require('./db/config');
var bodyParser = require('body-parser');

//setting up middleware for CORS requests. 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var staticFolder = path.join(__dirname, '../client')
//MIDDLEWARE
app.use(allowCrossDomain);
app.use(express.static(staticFolder));
app.use(bodyParser.json());

//ROUTER
app.post('/signup', function (req, res){
	// console.log("Stuff happened in the post", req.body);
	console.log(req.body.message.email, req.body.message.password);
	res.status(201).send({message: "RESPONSE OBJECT"});
})
app.listen(3000, function(){
	console.log("listening on port 3000");
})
