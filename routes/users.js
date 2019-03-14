const {User, validate} = require('../models/users');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt=require('bcrypt');
const auth=require('../middleware/auth');

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
        const token =user.generateAuthToken();
      
        res.header('x-auth-token',token).send(_.pick(user,['id','name', 'email']),200);
    });
});
});

router.get('/me',auth,async(req,res)=>{
  const user = await User.findById(req.user._id).select('-password');
  res.send(user)
})

module.exports=router;


 