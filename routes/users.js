const verifyToken =  require('../middleware/verifyToken');
const _= require('lodash')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user.js')

const express = require('express');
const router = express.Router();


//getting details of user
router.get('/me',verifyToken, async (req,res,next) =>{
   const user = await User.findById(req.user._id).select('-password');
   res.send(user)
})


//create
router.post('/', async  (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({eamil: req.body.email});
   if(user) return res.status(400).send('user already registered');
   
    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password      
    // });
     user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);

     await user.save();

     res.send( _.pick(user, ['_id', 'name', 'email']));
     
});

//delete
router.delete('/:id',verifyToken, async (req, res) => {
   const user = await User.findByIdAndRemove(req.params.id);
   if (!user) return res.status(404).send('The customer with the given ID was not found.');
   res.send(user);

 });

//update
 router.put('/:id',verifyToken, async (req, res) => {
   const { error } = validate(req.body); 
   if (error) return res.status(400).send(error.details[0].message);
 
   const user = await User.findByIdAndUpdate(req.params.id,
     { 
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
     }, { new: true });
 
   if (!user) return res.status(404).send('The customer with the given ID was not found.');
   
   res.send(user);
 });

module.exports = router;




             