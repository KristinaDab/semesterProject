var express = require('express');
var router = express.Router();

/* GET update recipe page. */
router.get('/', function(req, res, next) {
	res.render('updateRecipe', { title: 'Update A Recipe', id: 'updaterecipe'});
});

module.exports = router;