var express = require('express'),
    config = require('./config'),
    cors = require('cors');
    

var logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    load = require('express-load'),
    mongoose = require('mongoose'),
    authenticate = require('./authenticate'),
    passport = require('passport');
    
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected correctly to server");
});

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors(config.corsOptions));


load('models')
    .then('controllers')
    .then('routes')
    .into(app);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
