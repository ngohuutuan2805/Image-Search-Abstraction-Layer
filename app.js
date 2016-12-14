var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https')

require('dotenv').load()


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
app.use('/api', api)

/*
app.get('/saveData',function (req, res, next) {


  var myRequest = https.request('https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10', function (response) {

      // console.log('Status code: ' + response.statusCode)
      // console.log('Headers: ' + JSON.stringify(response.headers))
      // console.log('Body: ' + JSON.stringify(response.body))

      response.setEncoding('utf8')

      var data = ""

      response.on('end', function () {

        //console.log('End with data...' + JSON.stringify(data))

        saveToMongodb(data)

        res.send(data.toString())

      })

      response.on('data', function (chunk) {
        console.log('Data...')
        data += chunk
      })



    })

  myRequest.on('error', function (error) {
      next(error)
    })

  myRequest.end()

})

function saveToMongodb(data) {

  console.log("Saving data...")
  // Store iamge array to mongodb
  var mongoURL = 'mongodb://localhost:27017/ImageSearchAbstractionLayer'

  mongo.connect(mongoURL, function (err, db) {

    if(err){ throw err } else {

      db.createCollection('images', function (err, collection) {

        if(err){ throw err} else {

          console.log("Save data successful")
          var imageArr = JSON.parse(data)
          collection.insert(imageArr)

        }

      })
    }

  })

}
*/






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
