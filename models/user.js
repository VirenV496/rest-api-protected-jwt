const jwt =require('jsonwebtoken');
require('dotenv').config()
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
   email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },

  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    isAdmin: Boolean
});
//for generating authetifiation in user module
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.TOKEN_SECRET);
  return token;
}

const User= mongoose.model('User',userSchema);
//model of the user schema 
 
//validating fields of user schema 
function validateUser(User) {
   const schema = {
    name: Joi.string() .min(5) .max(50) .required(),
    email: Joi.string() .min(5) .max(255) .required(),
    password: Joi.string() .min(5) .max(255) .required()
  }; 

  return Joi.validate(User, schema);
}

exports.User = User; 
exports.validate = validateUser;


