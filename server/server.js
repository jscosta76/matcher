var express = require('express');
var app = express();
//var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
//var auth = require('./auth/routes');

require('mongoose').connect('mongodb://localhost/matcherapp');

app.use(function(err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401).send('Invalid token');
		return;
	}
	
	logger.error(err.stack);
	res.status(500).send('Ooops');
});

module.exports = app;
