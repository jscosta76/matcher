var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
	/*
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
	},*/
	headline:String,
	photoUrl:String,
	created:{
		type:Date,
		default:Date.now
	},
	updated:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);