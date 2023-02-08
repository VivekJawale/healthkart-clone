const express = require("express");
const mongoose = require("mongoose");
const User = require("../auth/auth.model");
const bcrypt = require("bcrypt");
const app = express.Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/authenticate");

const SECRET_KEY = process.env.SECRET_KEY;

app.use(authenticate)

app.get("/checkrole",async(req,res)=>{
    try{
        const role=req.body.role;
        const id=req.body.id;
        
        const user=await User.findOne({_id:id});
        //  console.log(user)
        if(user.role===role ){
             res.send("Hello Admin")
        }
        else{
            res.send("Not Authorized")
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports=app