const express = require("express");
const mongoose = require("mongoose");
const Purchase = require("./purchase.model");
const bcrypt = require("bcrypt");
const app = express.Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/authenticate");

const SECRET_KEY = process.env.SECRET_KEY;

app.use(authenticate);

app.get("/purchase",async(req,res)=>{

    try{
        const orders = await Purchase.find();
        res.send(orders);
    }
    catch(err){
        console.log(err)
    }
})

app.post("/purchase_order",async(req,res)=>{
    
    const {name,phoneNumber,orderCategory,userid}=req.body;
    const role=req.body.role;
    const id=req.body.id;

    try{
        if(id){
           
       const purchase=new Purchase({
        name,phoneNumber,orderCategory,userid:id
       })

       await purchase.save();

       res.send("purchased")
    }
    else{
        res.send("not logged in")
    }
    }
    catch(err){
          console.log(err)
    }
})

module.exports=app