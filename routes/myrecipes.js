var express = require('express');
var router = express.Router();

/* GET my recipes listing. */
router.get('/', function(req, res, next) {
	res.render('myrecipes' , { title: 'My Recipes', user: req.session.username, id: 'myrecipes'});
});

module.exports = router;