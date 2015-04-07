var path = require('path')
var express = require('express');
var db = require('./db/config');
var bodyParser = require('body-parser');
var User = require('./model/user');
var app = express();

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
	var response = {};
	console.log(req.body.message.email, req.body.message.password);
	var username = req.body.message.email;
	var password = req.body.message.password;
	new User({ username: username}).fetch().then(function(found){
		if(found){
			response.message = "user already signed up"
			response.status = "ERROR"
			res.status(201).send(response);
		} else {
			new User({
				username: username,
				password: password
			}).save().then(function(){
				response.message = "user saved to the database"
				response.status = "SUCCESS"
				res.status(201).send(response);
			})
		}
	})
})

app.post('/login', function (req, res){
	var response = {};
	console.log(req.body.message.email, req.body.message.password);
	var username = req.body.message.email;
	var password = req.body.message.password;

	new User({ username: username, password: password}).fetch().then(function(found){
		if(found){
			response.message = "user found";
			response.status = "SUCCESS"
			console.log(response);
			res.status(201).send(response);
		} else {
			response.message = "user not found";
			response.status = "ERROR";
			console.log(response);
			res.status(201).send(response);
		}
	})

});
app.listen(3000, function(){
	console.log("listening on port 3000");
})
