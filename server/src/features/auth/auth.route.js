const express = require("express");
const mongoose = require("mongoose");
const User = require("./auth.model");
const bcrypt = require("bcrypt");
const app = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  });
  
  app.get("/purchase",async(req,res)=>{

    try{
        const orders = await Purchase.find();
        res.send(orders);
    }
    catch(err){
        console.log(err)
    }
})
  
  app.delete("/:id",async(req,res)=>{
    try{
      let user = await User.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).send({msg:"deleted"});
    }
    catch(err){
       console.log(err)
    }
  })
  
  app.post("/login",async(req,res)=>{
      const { phoneNumber } = req.body;
  
      try{
          if(phoneNumber){
              let user = await User.findOne({ phoneNumber });
              if (user) {
                let token = jwt.sign(
                  {
                    _id: user._id,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    name: user.name
                  },
                  SECRET_KEY
                );
                return res
                  .status(200)
                  .send({ token,name:user.name, message: "Login Successfully" });
              }
              else{
                  res.send({msg:"new user"})
              }
          }
      }
      catch(err){
        console.log(err)
      }
  })
  
  app.post("/signup", async (req, res) => {
    const { email, name, password, phoneNumber, gender, role } = req.body;
  
    try {
      bcrypt.hash(password, 5, async (err, secured_password) => {
        if (err) {
          console.log(err);
          res.send({ msg: "registration failed" });
        } else {
          const checkuser = await User.findOne({ phoneNumber });
          // console.log(checkuser);
          if (checkuser) {
            return res.send({msg:"Already registred user cant register again"});
          }
  
          const user = new User({
            name,
            email,
            password: secured_password,
            phoneNumber,
            gender,
            role,
          });
          // console.log(user);
          await user.save();
        //   console.log(user);
          const hashed_password = user.password;
          if (user) {
            bcrypt.compare(password, hashed_password, (err, result) => {
              if (result) {
                const token = jwt.sign(
                  {
                    _id: user._id,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    name: user.name
                  },
                  SECRET_KEY
                );
                res.send({ msg: "Logged in success",name:user.name, token: token });
              } else {
                res.send({msg:"FAILED"});
              }
            });
          }
        }
      });
    } catch (err) {
      console.log(err)
    }
  });
  
  

module.exports = app;
