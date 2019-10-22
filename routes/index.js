var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET signin page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!', id: 'signin'});
});

/* POST signin information */
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



module.exports = router;
