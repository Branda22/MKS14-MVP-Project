var db = require('../db/config');

var User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: false,
	initialize: function() {
		this.on('creating', function (model, attrs, options){
			var username = model.get('username');
			var password = model.get('password');
		})
	}
})

module.exports = User;