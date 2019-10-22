var mysql = require('mysql');
const { promisify } = require('util')

var state = {
	db: null
};

exports.connection = function(done) {
	if (state.db) return done();
	state.db = mysql.createConnection({
		connectionLimit : 10,
		host: 'localhost',
		user: 'restaurantProject',
		password: 'restaurant1234',
		database: 'restaurantdb'
	});
	done();
};

// var config = {
// 		host: 'localhost',
// 		user: 'restaurantProject',
// 		password: 'restaurant1234',
// 		database: 'restaurantdb'
// 	};


// 	class Database {
// 		constructor( config = {
// 		host: 'localhost',
// 		user: 'restaurantProject',
// 		password: 'restaurant1234',
// 		database: 'restaurantdb'
// 	})  {
// 			this.connection = mysql.createConnection(config);
// 		}
// 		query( sql, args ) {
// 			return new Promise( ( resolve, reject ) => {
// 				this.connection.query( sql, args, ( err, results ) => {
// 					if ( err )
// 						return reject( err );
// 					resolve( results );
// 				} );
// 			} );
// 		}
// 		close() {
// 			return new Promise( ( resolve, reject ) => {
// 				this.connection.end( err => {
// 					if ( err )
// 						return reject( err );
// 					resolve();
// 				} );
// 			} );
// 		}
// 	};

// exports.connection = function(done){
// 	if (state.db) return done();
// 	const database = new Database();
// 	done();
// }

exports.get = function() {
	return state.db;
}
