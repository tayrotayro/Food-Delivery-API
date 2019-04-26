var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//Taylor -- Import mongoose and database config
var mongoose = require('mongoose');
var databaseConfig = require('./config/db');


//Taylor -- location to import the router for each file in the "routes" folder
var index = require('./routes/index');
var authorization = require('./routes/authorization');
var user = require('./routes/users');
var restaurant = require('./routes/restaurants');
var owner = require('./routes/owner');
var driver = require('./routes/driver');
var menuCategory = require('./routes/menuCategory');
var menuItem = require('./routes/menuItem');
var order = require('./routes/order');
var cart = require('./routes/cart');
var address = require('./routes/address');

var app = express();

// Allow CORS
var allowCrossDomain = function (req, res, next) {
  var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Tayro -- make sure app.js is using routes files
app.use('/', index);
app.use('/', authorization);
app.use('/', user);
app.use('/', restaurant);
app.use('/', owner);
app.use('/', driver);
app.use('/', menuCategory);
app.use('/', menuItem);
app.use('/', order);
app.use('/', cart);
app.use('/', address)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Taylor -- Set up Promise and connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.devURI);

//Taylor -- Check to see if database is connected
mongoose.connection.once('open', () => {
  console.log('Database connected');
}).on('error', (err) => {
  console.log('Database error', err);
})

module.exports = app;
