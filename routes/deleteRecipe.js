var express = require('express');
var router = express.Router();

/* GET update recipe page. */
router.get('/', function(req, res, next) {
	res.render('deleteRecipe', { title: 'Delete A Recipe', id: 'deleterecipe'});
});

module.exports = router;