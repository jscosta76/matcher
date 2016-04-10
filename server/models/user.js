var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local: {
		email:String,
		password:String,
	}
	/*,
	firstName:{
		type:String,
		required:true,
		trim:true
	},
	lastName:{
		type:String,
		required:true,
		trim:true
	},
	displayName:{
		type:String,
		required:true,
		trim:true
	},
	password:String,
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},

	approved:{
		type:Boolean,
		default:false
	},
	banned:{
		type:Boolean,
		default:false
	},
	admin:{
		type:Boolean,
		default:false
	},
	headline:String,
	photoUrl:String,
	created:{
		type:Date,
		default:Date.now
	},
	updated:{
		type:Date,
		default:Date.now
	}*/
});

// generate a hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// check is password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
