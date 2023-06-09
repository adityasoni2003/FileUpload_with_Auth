const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const isAuthenticated=async(req,res,next)=>{
    try {
       
        const authHeader = req.headers.authorization ;
       
        if(!authHeader){
            return res.status(401).json({
                error:"Authorization Header not found"
            })
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                error:"Token not found"
            })
        }


        const decoded = jwt.verify(token,"SECRET MESSAGE");
        const user = await User.findOne({where : {id:decoded.user.id}});
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })

        }
        req.user = user;
       
        next();
        
        
    } catch (error) {
        return res.status(500).send("auth middleware error")
        
    }

}

module.exports = isAuthenticated;