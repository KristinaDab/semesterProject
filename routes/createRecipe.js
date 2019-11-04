var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');


// /* GET create recipe page. */
// router.get('/', function(req, res, next) {
// 	res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe'});
// });

var query = 'SELECT * FROM category';

var query1 = 'SELECT * FROM ingredient_unit';

var query2 = 'SELECT * FROM ingredient';


// Get categories and units data from database to the page

router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		db.get().query(query1, (error, units, fields) => {

			db.get().query(query2, (error, ingredients, fields) => {

				// console.log(units);
				res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe', categories: categories, units: units, ingredients: ingredients});	

			});

		});

	});
});


router.post('/', function(req, res, next) {

	var title = req.body.title;
	var category = req.body.listcategory;
	var amount = req.body.yield;
	var directions = req.body.directions;

	const keys = Object.keys(req.body);

	var count = 0;

	for (const value in keys) {

		count = count + 1;

		var ingredient = req.body['listingredient' + count];
		var quantity =  req.body['quantity' + count];
		var unit = req.body['listunit' + count];
		
		if (ingredient === undefined) {
			continue;
		}

		console.log(ingredient, quantity, unit, value);
	}



	

// This does just the same as the method above



// for (var i = 1; i < keys.length; i++){

// 	var ingredient = req.body['listingredient' + i];
// 	var quantity =  req.body['quantity' + i];
// 	var unit = req.body['listunit' + i];

		// if (ingredient === undefined) {
		// 	continue;
		// }

// 	console.log(ingredient, quantity, unit);

// };


// console.log(ingredient, quantity, unit);

  // db.get().query('SELECT * FROM cook WHERE cook_username = ? AND password = ?', [username, password], function(error, results, fields) {
  //  if (results.length > 0) {
  //   req.session.loggedin = true;
  //   req.session.username = username;
  //   res.redirect('/home');
  // } else {
  //   res.status(400).json('Incorrect Username and/or Password!');
  // }			
  // res.end();
// });
});


module.exports = router;