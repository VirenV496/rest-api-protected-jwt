const Joi = require('joi');
var validate = (req) => {
    const schema = {
   
     email: Joi.string() .min(5) .max(255) .required(),
     password: Joi.string() .min(5) .max(255) .required()
   }; 
 
   return Joi.validate(req, schema);
 }

 module.exports = validate;