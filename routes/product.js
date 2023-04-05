const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const isSeller = require("../middlewares/seller");
const router = express.Router();
const upload =  require("../utils/fileUpload");


router.post("/create",isAuthenticated,isSeller,async(req,res)=>{
    try {
       
        
    
    upload(req,res,async(err)=>{
        if(err) return res.status(500).send(err);
        const {name,price} = req.body;
        if(!name||!price||!req.file){
            return res.status(400).json({
                error:"We require all three"
            })
        }

        if (Number.isNaN(price)){
            return res.status(400).json({
                error:"Price should be number"
            })
        }


        let productDetails = {
            name,
            price,
            content:req.file.path
        }
        console.log("Inside product route")

        return res.status(200).json({
            status:"OK",
            productDetails
        })
    })
} catch (error) {
    res.status(500).json({
        error : error
    })
    
}


})



module.exports = router;