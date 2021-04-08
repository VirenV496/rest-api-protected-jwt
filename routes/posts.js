
const express = require('express');
const router = express.Router();
const verifyToken =  require('../middleware/verifyToken'); //here im using this module as a middleware 


//importing and using protected routes here using verify middleware here 
router.get('/',verifyToken,(req,res, next) =>{
    
    res.json({

        posts: {title: 'hey there',
               desc: 'random data'
            }
        });
});

module.exports = router;
