const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({message:
  	error.details[0].message});
  const user= await User.findOne({email:req.body.email})
  if(user) return res.status(400).send({message:'user already exists'});


  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        const user = new User({
          name:req.body.name,
          email:req.body.email,
          password:hash
        })

        const newUser= user.save()
        res.send(_.pick(user,['id','name', 'email']));
    });
});
});

module.exports=router;


