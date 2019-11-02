var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');


// /* GET create recipe page. */
// router.get('/', function(req, res, next) {
// 	res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe'});
// });

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var jsonParser = bodyParser.json()

var query = 'SELECT * FROM category';

var query1 = 'SELECT * FROM ingredient_unit';


// Get categories and units data from database to the page

router.get('/', (req, res, next) => {

	db.get().query(query, (error, categories, fields) => {

		db.get().query(query1, (error, units, fields) => {

			// console.log(units);

			res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe', categories: categories, units: units});	

		});

	});
});


router.post('/', function(req, res, next) {
	var title = req.body.title;
	var category = req.body.listcategory;
	var amount = req.body.yield;

	
	const keys = Object.entries(req.body);

	// console.log(keys);

	for (const [key, value] of keys) {
		console.log(key, value);
	}

// 	for (var i = 0; i < numofoptions; i++){

// 		var optcount = i + 1;

// 		var ingr = req.body['ingredient' + optcount];
// 		var quant =  req.body['quantity' + optcount];
// 		var uni = req.body['listunit' + optcount];
//     // This prints req.body.optiondes1 as string, but I need the value of req.body.optiondes1
//     console.log(ingr, quant, uni); 
// };


var directions = req.body.directions;

// console.log(numofoptions); 


// var ingredient = req.body.ingredient;

// var quantity = req.body.quantity;

// var unit = req.body.listunit;





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