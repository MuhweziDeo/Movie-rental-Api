const {User, } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt=require('bcrypt');
const Joi = require('joi')
const config=require('config');


const userValidator = (user) =>{
  const schema={
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required()
  }
  return Joi.validate(user,schema)
}
router.post('/login', async (req, res) => {
  const { error } = userValidator(req.body); 
  if (error) return res.status(400).send({message:
  	error.details[0].message});
  const user= await User.findOne({email:req.body.email})
  if(!user) return res.status(400).send({message:'user doesnot exist'});

  const validPassword=await bcrypt.compare(req.body.password,user.password)
  console.log(validPassword)

  if(validPassword){
    const token =user.generateAuthToken();
    console.log(token);
    res.status(200).send({
      token:token,
      message:"you have been verified",
      username:user.name
    })
  }
  else {
    res.status(400).send('invalid login')
  }
});

module.exports=router;


