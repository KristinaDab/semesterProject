var express = require('express');
var router = express.Router();
var db = require('../db');
var mysql = require('mysql');
var async = require('async');


//Initializing mysql queries to avoid long strings in the code

var query = 'SELECT * FROM category ORDER BY category_name';
var query1 = 'SELECT r.title, r.recipe_id, r.cook_username, cat.category_name, r.yield, r.instructions FROM recipe AS r INNER JOIN category AS cat ON r.category_id = cat.category_id';
var query2 = 'SELECT ingr.ingredient_name, ingr.ingredient_id, ri.recipe_id, ri.quantity, u.unit_code FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code';
var query3 = 'SELECT * FROM ingredient_unit ORDER BY unit_code';

var onlyIngredients = 'SELECT ingredient_name, ingredient_id FROM ingredient';


var insertIngr = 'INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit_code) VALUES (?, (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ? , (SELECT unit_code FROM ingredient_unit WHERE unit_code = ?))';

var deleteIngr = 'DELETE FROM recipe_ingredient WHERE ingredient_id = ? AND recipe_id = ?';

var getRecipeIngr = 'SELECT ingr.ingredient_name, ingr.ingredient_id, ri.recipe_id, ri.quantity, u.unit_code FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code WHERE ri.recipe_id= ?';

var updateRecipe = 'UPDATE recipe SET title = ?, yield = ?, instructions = ?, category_id = (SELECT category_id FROM category WHERE category_name = ?) WHERE recipe_id = ?';

var updateRecipe_Ingr = 'UPDATE recipe_ingredient SET quantity = ?, unit_code = ? WHERE recipe_id = ? AND ingredient_id = ?';

var deleteRecipe = 'DELETE FROM recipe WHERE recipe_id = ?';


// Get all the recipes, categories and ingredients
router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		if(error) {
			console.log(error);
			throw error;
		} 

		db.get().query(query1, (error, allrecipes, fields) => {

			if(error) {
				console.log(error);
				throw error;
			} 

			db.get().query(query2, (error, ingredients, fields) => {

				if(error) {
					console.log(error);
					throw error;
				} 

				db.get().query(query3, (error, units, fields) => {

					if(error) {
						console.log(error);
						throw error;
					} 

					db.get().query(onlyIngredients, (error, onlyIngr, fields) => {

						if(error) {
							console.log(error);
							throw error;
						} 

						res.render('recipes', { title: 'Recipes', user: req.session.username, id: 'recipes', categories: categories, units: units, ingredients: ingredients, onlyIngr: onlyIngr, allrecipes : allrecipes});	
					});
				});
			});
		});
	});
});


// Post recipe update information from the update form

router.post('/updateRecipe', function(req, res, next) {

	var title = req.body.title;
	var amount = req.body.yield;
	var directions = req.body.directions;
	var category = req.body.listcategory;
	var recipeid = req.body.thisrecipeid;

	var user = req.session.username;

	// In order to use transactions I need to make a new database connection:

	db.get().getConnection(function(err, con) {

		console.log("1. getConnection");

		con.beginTransaction(function(err) {

			console.log("2. beginTransaction");

			// Update recipe title, yield, category and directions 

			con.query(updateRecipe,[title, amount, directions, category, recipeid], (error, updatedRecipe, fields) => {

				if(error) {
					return con.rollback(function() {
						console.log(error);
						throw error;

					});
				}

				console.log("3. update recipe title yield and so on");

				// Get current ingredients of the recipe we want to update

				con.query(getRecipeIngr, [recipeid], (error, recipeIngredients, fields) => {

					if(error) {
						return con.rollback(function() {
							console.log(error);
							throw error;
						});
					}

					console.log("4. getRecipeIngr");


					// Compare update-form ingredients with current recipe_ingredients 
					// If we deleted an ingredient from the update-form, it will be undefined
					// The undefined ingredient we can delete from the database


					async function loopIngrAndCommit() { 

						for (const value of recipeIngredients) {

							var ingredient = req.body['listingredient' + value.ingredient_id];
							var quantity =  req.body['quantity' + value.ingredient_id];
							var unit = req.body['listunit' + value.ingredient_id];


							if (ingredient === undefined) {

								// DELETE that ingredient from database table recipe_ingredient

								con.query(deleteIngr, [value.ingredient_id, recipeid], (error, deletedIngr, fields) => {

									if(error) {
										return con.rollback(function() {
											console.log(error);
											throw error;
										});
									}

									console.log("5. deleteIngr");

								});
								// continue;
							} else {

							// UPDATE ingredients

							con.query(updateRecipe_Ingr, [quantity, unit, recipeid, value.ingredient_id], (error, updatedIngr, fields) => {

								if(error) {
									return con.rollback(function() {
										console.log(error);
										throw error;

									});
								}

								console.log("6. updateRecipe_Ingr");
							});

						}

						await new Promise((resolve, reject) => {
							setTimeout(() => resolve("done!"), 250)
						});

					}

						// Get new ingredients that have been added to the update form with unique name-id's

						const keys = Object.keys(req.body);

						var count = 200;

						for (const newValue in keys) {

							count = count + 1;

							var newIngredient = req.body['listingredient' + count];
							var newQuantity =  req.body['quantity' + count];
							var newUnit = req.body['listunit' + count];

							if (newIngredient === undefined) {
								continue;
							}

							// ADD new ingredients to the database table recipe_ingredient 

							con.query(insertIngr, [recipeid, newIngredient, newQuantity, newUnit], (error, insertedIngr, fields) => {

								if(error) {
									return con.rollback(function() {
										console.log(error);
										throw error;

									});
								}

								console.log("7. insertedIngr");
							});	

							await new Promise((resolve, reject) => {
								setTimeout(() => resolve("done!"), 250)
							});
						}

						// If all went smooth, commit data to the database

						con.commit(function(err){
							if(err) {
								return con.rollback(function() {
									console.log(error);
									throw error;
								});
							}

							console.log("8. Transaction successful!!!")

							res.redirect('/recipes');
						});
					};

					loopIngrAndCommit();
				});	
			});
		});	
	});
});


// POST Delete recipe

router.post('/deleteRecipe', function(req, res, next) {

	db.get().getConnection(function(err, con) {

		console.log("1. getConnection");

		con.beginTransaction(function(err) {

			console.log("2. beginTransaction");
			

			// Get id of the current recipe

			var recipeid = req.body.thisrecipeid; 

			db.get().query(deleteRecipe,[recipeid], (error, deletedRecipe, fields) => {

				if(error) {
					return con.rollback(function() {
						console.log(error);
						throw error;

					});
				}
				console.log("Deleting...");

				con.commit(function(err){
					
					if(err) {
						return con.rollback(function() {
							console.log(error);
							throw error;
						});
					}

					console.log("Deleted successfully!!!")

					res.redirect('/recipes');
				});
			});

		});
	});

});


module.exports = router;

