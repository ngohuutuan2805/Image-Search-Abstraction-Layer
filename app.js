var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http')


var index = require('./routes/index');
var users = require('./routes/users');
var api   = require('./routes/api.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//app.use('/api', api)


app.get('/saveData',function (req, res, next) {
    console.log('1')

    http.request({
      host:"https://cryptic-ridge-9197.herokuapp.com/",
      path:"api/imagesearch/lolcats%20funny?offset=10",
      port:9197,
      header:{
        'Content-Type': 'application/json'
      },
      method:"GET"
    }, function (res) {

      console.log('2')
      console.log('Status code: ' + res.statusCode)
      console.log('Headers: ' + JSON.stringify(res.headers))
      console.log('Headers: ' + JSON.stringify(res.body))

      res.setEncoding('utf8')

      res.on('data', function (chunk) {
        console.log('Data...')
      })

      res.on('error', function (error) {
        next(error)
      })


    }).end()



    console.log('3')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
