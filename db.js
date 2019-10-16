var mysql = require('mysql');

var state = {
	db: null
};

exports.connection = function(done) {
	if (state.db) return done();
	state.db = mysql.createConnection({
		host: 'localhost',
		user: 'restaurantProject',
		password: 'restaurant1234',
		database: 'restaurantdb'
	});
	done();
};

exports.get = function() {
	return state.db;
}
