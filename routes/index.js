var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    res.redirect('/home');
  }else{
    res.render('login', { title: 'Welcome!', id: 'signin'});
  }
});

/* POST login information */
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.get().query('SELECT * FROM cook WHERE cook_username = ? AND password = ?', [username, password], function(error, results, fields) {
   if (results.length > 0) {
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/home');
  } else {
    res.status(400).json('Incorrect Username and/or Password!');
  }			
  res.end();
});
});


/* GET logout from the session */
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// Create variables with separate query strings

// var query = 'SELECT * FROM category ORDER BY category_name';

// var query1 = 'SELECT * FROM ingredient_unit ORDER BY unit_code';

// var query2 = 'SELECT * FROM ingredient ORDER BY ingredient_name';

// var query3 = 'SELECT r.title, r.recipe_id, r.cook_username, cat.category_name, r.yield, r.instructions FROM recipe AS r INNER JOIN category AS cat ON r.category_id = cat.category_id';



// router.get('/updateRecipe', function(req, res, next){

//   db.get().query(query, (error, categories, fields) => {

//     db.get().query(query1, (error, units, fields) => {

//       db.get().query(query2, (error, ingredients, fields) => {

//         db.get().query(query3, (error, allrecipes, fields) => {

//         // console.log(units);
//         res.render('updateRecipe', { title: 'Update Recipe',user: req.session.username, id: 'updateRecipe', categories: categories, units: units, ingredients: ingredients, allrecipes: allrecipes});

//       });

//       });

//     });

//   });
  
// });


router.put('/updateRecipe/(:recipe_id)', function(req, res, next){

  // res.render('updateRecipe', { title: 'update', id: 'update'});
});

router.post('/deleteRecipe/(:recipe_id)', function(req, res, next){
    // res.render('deleteRecipe', { title: 'delete', id: 'delete'});

  });

module.exports = router;