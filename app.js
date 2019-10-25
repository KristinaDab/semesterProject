var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var session = require('express-session');


// MySql
var mysql = require('mysql');
var db = require('./db');
db.connection(function(){
  console.log('Connected to DB');
});



var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var recipesRouter = require('./routes/recipes');
var myRecipesRouter = require('./routes/myrecipes');
var createRecipeRouter = require('./routes/createRecipe');
var updateRecipeRouter = require('./routes/updateRecipe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding code for the session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.username = req.session.username;
  next();
});

function restrictAccess(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/');
  }
}

app.get('/url', function (req, res) {
  res.render('view', {
    page: req.url,
    nav: {
      'home': '/home',
      'recipes': '/recipes',
      'myrecipes': '/myrecipes'
    }
  });
});

app.use('/', indexRouter);
app.use('/home', restrictAccess, homeRouter);
app.use('/recipes', restrictAccess, recipesRouter);
app.use('/myrecipes', restrictAccess, myRecipesRouter);
app.use('/createRecipe', restrictAccess, createRecipeRouter);
app.use('/updateRecipe', restrictAccess, updateRecipeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
