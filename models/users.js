const mongoose = require('mongoose');
const Joi=require('joi');
const jwt= require('jsonwebtoken');
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		min:5,
		max:20
	},
	email:{
		required:true,
		type:String,
		min:10,
		max:30,
		unique:true


	},
	password:{
		required:true,
		type:String,
		min:10,
		max:1024,

	}
})

userSchema.methods.generateAuthToken= function(){
	const token =jwt.sign({_id:this._id},"asasas");
	return token;
}
const User=mongoose.model('User', userSchema);

// userValidaor

const userValidator = (user) =>{
	const schema={
		name:Joi.string().min(5).max(50).required(),
		email:Joi.string().min(5).max(255).required().email(),
		password:Joi.string().min(5).max(255).required()
	}

	return Joi.validate(user,schema)


}
exports.User=User;
exports.validate=userValidator;
