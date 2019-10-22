var express = require('express');
var router = express.Router();

/* GET create recipe page. */
router.get('/', function(req, res, next) {
	res.render('createRecipe', { title: 'Create A Recipe', id: 'createrecipe'});
});


module.exports = router;