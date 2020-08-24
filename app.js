var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


var devCaps = require("./TRAININGxml");
console.log(devCaps.map(i => i.xml));

var testCaps = [];

//
// for (var currentCap in devCaps) {
//   request({
//     url: "http://josiahchoi.com/myjson",
//     method: "POST",
//     headers: {
//       "content-type": "application/xml",  // <--Very important!!!
//     },
//     body: currentCap.xml
//   }, function (error, response, body){
//     console.log(response);
//   });
// };

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
