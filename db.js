var mysql = require('mysql');
const { promisify } = require('util')

var state = {
	db: null
};

exports.connection = function(done) {
	if (state.db) return done();
	state.db = mysql.createPool({
		connectionLimit : 5,
		host: 'localhost',
		user: 'restaurantProject',
		password: 'restaurant1234',
		database: 'restaurantdb'
	});
	// var getConnection = function() {
	// 	state.db.getConnection(function(err, connection){
	// 		if(err) throw err;
	// 		return connection;
	// 	})
	// }
	done();
};


exports.get = function() {
	return state.db;
}
