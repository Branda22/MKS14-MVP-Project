var path = require('path')
var express = require('express');
var app = express();
// app.use(express-static())

var staticFolder = path.join(__dirname, '../client')
console.log("Using static folder:", staticFolder)
app.use(express.static(staticFolder))

// app.get('/', function (req, res){
// 	res.render('index.html');
// });
app.listen(3000, function(){
	console.log("listening on port 3000");
})
