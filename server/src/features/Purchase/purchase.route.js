const express = require("express");
const mongoose = require("mongoose");
const Purchase = require("./purchase.model");
const bcrypt = require("bcrypt");
const app = express.Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/authenticate");

const SECRET_KEY = process.env.SECRET_KEY;

app.use(authenticate);


app.post("/purchase_order",async(req,res)=>{
    
    const {name,phoneNumber,orderCategory}=req.body;
    const role=req.body.role;
    const id=req.body.id;

    try{
        if(id){
           
       const purchase=new Purchase({
        name,phoneNumber,orderCategory,userid:id
       })

       await purchase.save();

       res.send({msg:"purchased"})
    }
    else{
        res.send({msg:"not logged in"})
    }
    }
    catch(err){
          console.log(err)
    }
})

module.exports=app