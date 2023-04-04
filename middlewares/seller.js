const isSeller= async(req,res,next)=>{
    console.log(req.user)
    if (req.user.isSeller){
        console.log("Inside seller middleware")
        next();
    }else{
        return res.status(401).json({
            error : "You are not seller"
        })
    }

}

module.exports = isSeller;