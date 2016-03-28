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

router.route('/user')
	.post(function(req, res){
		var user = new User();
		
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.displayName = req.body.displayName;
		user.password = req.body.password;	
		user.email = req.body.email;
	
		user.save(function(err){
			if(err){
				if(err.code===11000){
					//res.redirect('/user/new?exists=true');
					console.log('email already exists');
				} else {
					//res.redirect('?error=true');
					console.log('some other error occured');
				}
			} else {
				console.log('User successfully saved: ' + user);
				/*req.session.user = {
					"name": user.firstName+' '+user.lastName,
					"email":user.email,
					"_id":user._id
				};
				req.session.loggedIn = true;
				res.redirect('/user');*/
				res.json({ message: 'User successfully created!' });
			}
		});
	})
	.get(function(req, res){
		User.find(function(err, users){
			if(err){
				res.send(err);
			}
			
			res.json(users);
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Stuff happening on port ' + port);