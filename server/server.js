var express = require('express');
var app = express.createServer();
// app.use(express-static())

app.get('/', function (req, res){
	res.render('index.html');
});
app.listen(3000, function(){
	console.log("listening on port 3000");
})
