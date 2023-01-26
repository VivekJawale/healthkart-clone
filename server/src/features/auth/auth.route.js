const express = require("express");
const mongoose = require("mongoose");
const User = require("./auth.model");
const bcrypt = require("bcrypt");
const app = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

app.post("/login", async (req, res) => {
    const { phoneNumber, email, password } = req.body;
    try {
        if (phoneNumber) {
            let user = await User.findOne({ phoneNumber });
            if (user) {
                let token = jwt.sign(
                    {
                        _id: user._id,
                        phoneNumber: user.phoneNumber,
                    },
                    SECRET_KEY
                );
                let otp = generateOtp();
                return res
                    .status(200)
                    .send({ token, otp, message: "login Successfully" });
            } else {
                let user = await User.create({ phoneNumber });
                let token = jwt.sign(
                    {
                        _id: user._id,
                        phoneNumber: user.phoneNumber,
                    },
                    SECRET_KEY
                );
                let otp = generateOtp();
                return res.status(200).send({ otp, token, user });
            }
        } else {
            let user = await User.findOne({ email });
            if (user) {
                let pass = await bcrypt.compare(password, user.password);
                if (!pass) {
                    return res.send("incorrect password");
                } else {
                    let token = jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                            role: user.role,
                        },
                        SECRET_KEY
                    );
                    return res.send({ token, user, message: "Login Successfully" });
                }
            } else {
                return res.send("Ask Admin to create the role");
            }
        }
    } catch (error) {
        return res.send(error.message);
    }
});

app.post("/signup", async (req, res) => {
    const { email, name, password, age, gender, role, token } = req.body;

    try {
        if (!token) {
            let user = await User.findOne({ email });
            if (user) {
                return res.send({
                    status: 0,
                    massage: "user already exist",
                });
            } else {
                if (role) {
                    const pass = await bcrypt.hash(password, 10);
                    let user = await User.create({
                        ...req.body,
                        password: pass,
                    });
                    return res.status(201).send(user);
                } else {
                    const pass = await bcrypt.hash(password, 10);
                    let user = await User.create({
                        ...req.body,
                        password: pass,
                    });
                    return res.status(201).send({
                        user,
                        message: "User has been created",
                    });
                }
            }
        } else {
            if (!role) {
                return res.send("Role is missing");
            } else {
                let pass = await bcrypt.hash(password, 10);
                let user = await User.create({
                    ...req.body,
                    password: pass,
                });
                return res
                    .status(201)
                    .send({ user, message: "User created Successfully by Admin" });
            }
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

const generateOtp = () => {
    return Math.floor(Math.random() * 10000) + 1;
};

module.exports = app;
