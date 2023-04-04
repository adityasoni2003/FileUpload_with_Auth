const express = require("express");
const bcrypt = require("bcrypt");
const {validateName,validateEmail,validatePass} = require("../utils/validators");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,isSeller} = req.body;
        const existingUser = await User.findOne({where:{email}});
        console.log("Inside user route")
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
        const hashedPass = await bcrypt.hash(password,10);
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
        const {email,password} = req.body;

        if(email.length === 0){
            return res.status(400).json({
                error:"Please provide email"
            })
        }
        if(password.length === 0){
            return res.status(400).json({
                error:"Please provide password"
            })
        }

        const existingUser = await User.findOne({where:{email}});

        if(!existingUser){
            return res.status(404).json({
                error : "User not found please signup"
            })
        }
        

        const passwordMatch = await bcrypt.compare( password , existingUser.pass);
        if(!passwordMatch){
            return res.status(400).json({
                error:"Email or Password mismatch"
            })
        }
        

        const payload = {user : {id:existingUser.id}};
        const bearerToken = await jwt.sign(payload,"SECRET MESSAGE",{
            expiresIn : 36000
        }); 
        
        res.cookie('t',bearerToken,{ expire :  new Date() + 99999});
        res.status(200).json({
            bearerToken
        })

        
    } catch (error) {
    res.status(500).send(error)        
    }

});


router.get("/signout",async(req,res)=>{
    try {
        res.clearCookie("t");
        return res.status(200).json({message:"Cookie Cleared"});


    } catch (error) {
        return res.status(500).json({error});
        
    }

})


module.exports = router;
