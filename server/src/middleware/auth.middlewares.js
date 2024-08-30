const jwt = require("jsonwebtoken")
const { AuthUser } = require("../models/user.model.js");
const auth = async (req,res,next)=>{

try {
    
    const token = req.cookies.access_token
    // console.log(token)
    if(!token){
        return res.status(401).send("Not Authenticated or not authorized userr")
       }
    const verifyUser = jwt.verify(token,process.env.JWT_SECRET)
   
    const user = await AuthUser.findById(verifyUser._id)
   
    if(!user)
    {
     
        return res.status(401).send("User Not Found")
    }
    req.token = token
    req.user = user;
    next();

} catch (error) {

    res.status(401).send("Error While Authenticating User")
    
}

}

module.exports = auth