var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var productsRoutes = require('./routes/products');
var passport=require('passport');

var app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var config_database = require('./config/database');


const DATABASE_ADDRESS = config_database.api + config_database.user + ':' + config_database.password + config_database.server + ':' + config_database.port + '/' + config_database.name;


// Connect to MongoDB
mongoose.connect(DATABASE_ADDRESS, { useMongoClient: true }, function(err,data){
    if(err)
    {
        console.log('err : ' + err);
    }
    else
    {
        console.log('Connected to Mlab!!!');        
    }
    });



// mongoose.connect('mongodb://OriAmir:0509731212Aa!@ds131384.mlab.com:31384/angular-web');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', appRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.use('/products', productsRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
