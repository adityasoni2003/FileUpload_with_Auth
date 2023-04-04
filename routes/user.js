const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {validateName,validateEmail,validatePass} = require("../utils/validators");
const User = require("../models/userModel");




router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,isSeller} = req.body;
        const existingUser = await User.findOne({where:{email}});
        if (existingUser){
            return res.status(403).json({error:"User already exists please signUp"});
        }
        if (!validateName(name)){
            return res.status(400).json({error:"User name is not correct"});
        }
        if (!validateEmail(email)){
            return res.status(400).json({error:"User email is not correct"});
        }
        if (!validatePass(password)){
            return res.status(400).json({error:"User password is not correct"});
        }
        const hashedPass = await bcrypt.hash(password);
        const user = {
            name,
            email,
            pass:hashedPass,
            isSeller
        };
        const createdUser = await User.create(user);
        return res.status(201).json({
            message:`Welcome ${createdUser.name}`
        })



        
    } catch (error) {
    return res.status(500).send(error)        
    }
    
});


router.get("/signin",async(req,res)=>{
    try {
        
    } catch (error) {
    res.status(500).send(error)        
    }

});



module.exports = router;
