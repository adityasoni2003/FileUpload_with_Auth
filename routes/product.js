const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const isSeller = require("../middlewares/seller");
const router = express.Router();
const upload =  require("../utils/fileUpload");
const Product = require("../models/productModel")


router.post("/create",isAuthenticated,isSeller,async(req,res)=>{
    
   
    
    upload(req,res,async(err)=>{
        
        
        
        
        if(err){return res.status(500).send(err)};
        console.log(req)

        const {name,price} = req.body;
        
        if(!name||!price||!req.file){
            return res.status(400).json({
                error:"We require all three"
            })
        }
        console.log("Insise storage post product")

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
        const createdProduct = await Product.create(productDetails);
        

        return res.status(200).json({
            status:"OK",
            createdProduct
        })
        
    


    })
});


router.get("/get/all",isAuthenticated,async(req,res)=>{
    try {
        const products = await Product.findAll();
        console.log(products);
        res.status(200).json({
            message:"Success"
        })
        
    } catch (e) {
        console.log(e);
        res.send(e)
        
    }
})




router.get("/get/:id",isAuthenticated,async(req,res)=>{
    try {
        const idNumber = req.params.id;
      
        
        const product = await Product.findOne({where:{id:idNumber}});
       
        if (product != {}){
            res.status(200).json({
                status:"ok",
                content : product.content
            });
        }
        else{

            res.status(404).json({
                message:"Item not found"
            })
        }
    
    } catch (error) {
        res.send(error)
        console.log(error)
        
    }

})








module.exports = router;