var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var mysql = require('mysql');



// Create variables with separate query strings

var query = 'SELECT * FROM category ORDER BY category_name';

var query1 = 'SELECT * FROM ingredient_unit ORDER BY unit_code';

var query2 = 'SELECT * FROM ingredient ORDER BY ingredient_name';

var onlyIngredients = 'SELECT ingredient_name, ingredient_id FROM ingredient';

var query3 = 'INSERT INTO recipe (title, yield, instructions, category_id, cook_username) VALUES (?,?,?, (SELECT category_id FROM category WHERE category_name = ?), (SELECT cook_username FROM cook WHERE cook_username = ?))';

var query4 = 'INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit_code) VALUES ((SELECT recipe_id FROM recipe WHERE title = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ? , (SELECT unit_code FROM ingredient_unit WHERE unit_code = ?))';


// GET categories, ingredients and units data from the database 

router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		db.get().query(query1, (error, units, fields) => {

			db.get().query(query2, (error, ingredients, fields) => {

					db.get().query(onlyIngredients, (error, onlyIngr, fields) => {

					// console.log(units);
					res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe', user: req.session.username, categories: categories, units: units, ingredients: ingredients, onlyIngr: onlyIngr});	

				});
			});
		});

	});
});



// POST a recipe form data to the database with transaction

router.post('/', function(req, res, next) {

	// Get input from the createRecipe form

	var title = req.body.title;
	var amount = req.body.yield;
	var directions = req.body.directions;
	var category = req.body.listcategory;
	var user = req.session.username;

	// Start new connection to the database pool and 
	//assign new-recipe form input resuts to the query string

	db.get().getConnection(function(err, con) {

		con.beginTransaction(function(err) {

			con.query(query3,[title, amount, directions, category, user], (error, newRecipe, fields) => {

				if(error) {
					return con.rollback(function() {

						console.log(error);
						throw error;

					})
				}

		// Create varible which gets all the elements from the new-recipe form

		const keys = Object.keys(req.body);

		// Set a counter which keeps track of how many there are dynamic input field names
		// that start with listingredient, quantity and listunit. 

		var count = 0;

		// Loop through the form keys to find all dynamically added input fields

		for (const value in keys) {

			count = count + 1;

			// Now to each dynamic field name that starts with listingredient, quantity and listunit we add a count 
			// that's how we find names that exist

			var ingredient = req.body['listingredient' + count];
			var quantity =  req.body['quantity' + count];
			var unit = req.body['listunit' + count];

			// Skip values that are undefined 

			if (ingredient === undefined) {
				continue;
			}

			// Assign dynamic fields to query string 

			con.query(query4, [title, ingredient, quantity, unit], (error, newIngredient, fields) => {

				// Catch errors if any 

				if(error) {
					return con.rollback(function() {
						console.log(error);
						throw error;

					})
				}
			});
		};

		// If there were no errors, commit data to the database. 
		// In case of errors- roll back

		con.commit(function(err){
			if(err) {
				return con.rollback(function() {
					console.log(error);
					throw error;

				})
			}
		})

		console.log("Success!!!")

		// Redirect to the recipes page
		res.redirect('/recipes');

		  // End the connection to the database
		  res.end();
		});

		})
	})

});


module.exports = router;