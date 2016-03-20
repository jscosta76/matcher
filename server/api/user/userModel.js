var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}
});

module.exports = mongoose.model('user', UserSchema);