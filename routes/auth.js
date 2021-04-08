const jwt =require('jsonwebtoken');
require('dotenv').config()
const Joi = require('joi');
const validate =  require('../validations/validate')
const _= require('lodash')

const bcrypt = require('bcrypt')
const {User} = require('../models/user')

const express = require('express');
const router = express.Router();


router.post('/', async  (req, res) => {
  // console.log(req.body.email);

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('invalid email');
   
   const validPassword = await bcrypt.compare( req.body.password, user.password) 

    if (!validPassword) return res.status(400).send('invalid email pass');
  
     //create and assign a token to the user 
    //  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    const token = user.generateAuthToken();
     res.header('auth-token', token).send(token);
      //assigning token to header 
    //  res.send("logged");
});
module.exports = router;

