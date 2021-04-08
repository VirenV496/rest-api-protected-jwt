// verifying protected routes  this module using verify the token in posts.js
const jwt = require('jsonwebtoken')
require('dotenv').config()
 function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    // console.log(token);
    if(!token) return res.status(401).send('access denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
         req.user = verified;
         next();
        //  console.log(req.user);

    }catch(err){
        res.status(400).send('Invalid Token');
     
    }
}
module.exports = verifyToken;




