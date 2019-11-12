var express = require('express');
var router = express.Router();
var db = require('../db');

//Initializing mysql queries to avoid long strings in the code
var query = 'SELECT * FROM category ORDER BY category_name';

var query1 = 'SELECT r.title, r.recipe_id, r.cook_username, cat.category_name, r.yield, r.instructions FROM recipe AS r INNER JOIN category AS cat ON r.category_id = cat.category_id';

var query2 = 'SELECT ingr.ingredient_name, ingr.ingredient_id, ri.recipe_id, ri.quantity, u.unit_code FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code';

var query3 = 'SELECT * FROM ingredient_unit ORDER BY unit_code';


// Get all the recipes, categories and ingredients
router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		db.get().query(query3, (error, units, fields) => {

			db.get().query(query1, (error, allrecipes, fields) => {

				db.get().query(query2, (error, ingredients, fields) => {

					res.render('recipes', { title: 'Recipes', user: req.session.username, id: 'recipes', categories: categories, units: units, ingredients: ingredients, allrecipes : allrecipes});	
				});
			});
		});
	});
});

module.exports = router;

