var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/matcherapp');

var User = require('./server/models/user');

var router = express.Router();

router.use(function(req, res, next){
	console.log('Operating...');
	next();
});

router.get('/', function(req, res){
	res.json({message:'API is up and running'});
});

app.use('/api', router);

app.listen(port);
console.log('Stuff happening on port ' + port);