var express = require('express');
var router = express.Router();

/* GET recipes listing. */
router.get('/', function(req, res, next) {
	res.render('recipes', { title: 'Recipes', user: req.session.username, id: 'recipes'});
});

module.exports = router;