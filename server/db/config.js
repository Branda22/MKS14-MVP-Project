var Bookshelf = require('bookshelf');
var path = require('path');
var bcrypt = require('bcrypt');

//SET UP DATABASE CONNECTION
var db = Bookshelf.initialize({
	client: 'sqlite3',
	connection: {
		host: '127.0.0.1',
		filename: path.join(__dirname, 'marketview.db')
	}
})

//DATABASE SCHEMAS
db.knex.schema.hasTable('users').then(function(exists){
	if(!exists){
		db.knex.schema.createTable('users', function(user){
			user.increments('id').primary();
			user.string('username', 50);
			user.string('password', 255);
		}).then(function(table){
			console.log('Created Table', table);
		});
	}
});

module.exports  = db;