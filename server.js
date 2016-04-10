var express = require('express');
var path = require('path');
var favicon = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// module for session storage
var app = express();

//Import passport and warning modules
var passport = require('passport');
var flash = require('connect-flash');

// setup routes
var routes = require('./server/routes/index');
//var speakers = require('./server/routes/speakers');

// Database config
var configDB = require('./server/config/config.js');
// connect to database
mongoose.connect(configDB.url);

// passport configuration
//require('./server/config/passport')(passport);

//view engine setup
app.set('view', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
// secret for session
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    //store session on MongoDB using express-session + connect mongo
    store: new MongoStore({
        url: configDB.url,
        collection : 'sessions'
    })
}));

// init passport authentication
app.use(passport.initialize());
// persist login sessions
app.use(passport.session());
//flash messages
app.use(flash());

// load routes
app.use('/', routes);
//app.use('/api/speakers', speakers);

// catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error('Not found');
		err.status = 404;
		next(err);
});

// dev error handler - prints stack trace
if(app.get('env') === 'development'){
	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}


// prod error handler - no stack tree
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error:{}
	});
});

module.exports = app;
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){
	console.log('Magic happens here: ' + server.address().port);
});
