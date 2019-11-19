var express = require('express');
var router = express.Router();
var db = require('../db');
var mysql = require('mysql');


//Initializing mysql queries to avoid long strings in the code
var query = 'SELECT * FROM category ORDER BY category_name';
var query1 = 'SELECT r.title, r.recipe_id, r.cook_username, cat.category_name, r.yield, r.instructions FROM recipe AS r INNER JOIN category AS cat ON r.category_id = cat.category_id';
var query2 = 'SELECT ingr.ingredient_name, ingr.ingredient_id, ri.recipe_id, ri.quantity, u.unit_code FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code';
var query3 = 'SELECT * FROM ingredient_unit ORDER BY unit_code';


var insertIngr = 'INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit_code) VALUES ((SELECT recipe_id FROM recipe WHERE title = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ? , (SELECT unit_code FROM ingredient_unit WHERE unit_code = ?))';

var updateRecipe = 'UPDATE recipe SET title = ?, yield = ?, instructions = ?, category_id = (SELECT category_id FROM category WHERE category_name = ?) WHERE recipe_id = ?';

var updateRecipe_Ingr = 'UPDATE recipe_ingredient SET quantity = ?, unit_code = ? WHERE recipe_id = ? AND ingredient_id = (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?)';


// Get all the recipes, categories and ingredients
router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		db.get().query(query1, (error, allrecipes, fields) => {

			db.get().query(query2, (error, ingredients, fields) => {

				db.get().query(query3, (error, units, fields) => {

					res.render('recipes', { title: 'Recipes', user: req.session.username, id: 'recipes', categories: categories, units: units, ingredients: ingredients, allrecipes : allrecipes});	
				});
			});
		});
	});
});


router.post('/', function(req, res, next) {

	var title = req.body.title;
	var amount = req.body.yield;
	var directions = req.body.directions;
	var category = req.body.listcategory;
	var user = req.session.username;

	var recipeid = req.body.thisrecipeid;


	const keys = Object.keys(req.body);
	console.log(keys);

	res.redirect('/recipes');

});

module.exports = router;

