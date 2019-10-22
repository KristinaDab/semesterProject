var express = require('express');
var router = express.Router();
var db = require('../db');

var query1 = 'SELECT r.title, r.recipe_id, r.cook_username, cat.category_name, r.yield, r.instructions FROM recipe AS r INNER JOIN category AS cat ON r.category_id = cat.category_id';

var query2 = 'SELECT ingr.ingredient_name, ri.recipe_id, ri.quantity, u.unit_code FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code';

// var queryAll = 'SELECT c.cook_username, r.title, r.yield, r.instructions, ingr.ingredient_name, ri.quantity,u.unit_code,cat.category_name FROM recipe AS r INNER JOIN recipe_ingredient AS ri ON r.recipe_id = ri.recipe_id INNER JOIN ingredient AS ingr ON ri.ingredient_id = ingr.ingredient_id INNER JOIN ingredient_unit AS u ON ri.unit_code = u.unit_code INNER JOIN category AS cat ON r.category_id = cat.category_id INNER JOIN cook AS c ON r.cook_username = c.cook_username';

// Get all the recipes
router.get('/', (req, res, next) => {

	db.get().query(query1, (error, allrecipes, fields) => {

			db.get().query(query2, (error, ingredients, fields) => {
			
			res.render('recipes', { title: 'Recipes', user: req.session.username, id: 'recipes', ingredients: ingredients, allrecipes : allrecipes});	
	});
	});
});


module.exports = router;

