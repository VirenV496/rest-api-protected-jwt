module.exports = function (req,ress ,next){
//401 UnAuthorized
//403 Forbidden
if (!req.user.isAdmin) return res.status(403).send('Acess Denied')
next();


}