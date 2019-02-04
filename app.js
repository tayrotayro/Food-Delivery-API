var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Taylor -- Import mongoose and database config
var mongoose = require('mongoose');
var databaseConfig = require('./config/db');


//Taylor -- location to import the router for each file in the "routes" folder
var index = require('./routes/index');


var app = express();

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
