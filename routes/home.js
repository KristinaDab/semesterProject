var express = require('express');
var router = express.Router();

/* GET main (home) page */
router.get('/', function(req, res, next) {
	res.render('home', { title: "Chef's Recipes", user: req.session.username, id: 'home' });
});

module.exports = router;
