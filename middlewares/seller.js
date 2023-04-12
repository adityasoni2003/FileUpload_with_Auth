const isSeller= async(req,res,next)=>{
    
    if (req.user.dataValues.isSeller){
        
        next();
    }else{
        return res.status(401).json({
            error : "You are not seller"
        })
    }

}

module.exports = isSeller;