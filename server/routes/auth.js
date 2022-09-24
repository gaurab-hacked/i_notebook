const express = require("express");
const route = express.Router();
const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchuser = require("../middleware/fetchuser");

//Route 1: Register user /api/auth/register :POST
route.post("/register", async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        //check if user already exist or not
        const userExist = await User.findOne({email});
        if(userExist) return res.json({msg:"User already exist"});
        //make password secure
        const salt = await bcryptjs.genSalt(10);
        const securePass = await bcryptjs.hash(password, salt);
        const user = new User({name, email, password: securePass});
        //send Json web token to the client
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data, process.env.SECRIT_KEY)
        await user.save();        
        res.status(200).json({msg:"success", Key : token})
    }catch(error){
        res.status(500).json({error, msg:"Server error"})
    }
})

//Route 2: login user /api/auth/login :POST [need Register]
route.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        //check user already exist or not
        const user = await User.findOne({email});
        if(!user) return res.json({msg:"Invalid username or password"});
        //check if password is correct or not
        const passcheck = await bcryptjs.compare(password, user.password); 
        if(!passcheck) return res.json({msg:"Invalid username or password"});
        //send json web token
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data, process.env.SECRIT_KEY);
        res.status(200).json({msg:"success", Key : token})
    }catch(error){
        res.status(500).json({error, msg:"Server error"})
    }
})

//Route 3: Get user detail /api/auth/getuser [need login]
route.post("/getuser", fetchuser, async (req, res)=>{
    try{
        // res.send("Hello world");
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    }catch(error){
        res.status(500).json({error, msg:"Server error"})
    }
})

module.exports = route;