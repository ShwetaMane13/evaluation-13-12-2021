require("dotenv").config();
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const User = require('../models/users.model');

const newToken = (user) => {
    return token = jwt.sign({ user: 'user' }, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) => {
    try{
        let user = await User.findOne( { email: req.body.email } ).lean().exec();
        if(user)
        {
            return res.status(400).json({
                status: "failed",
                message: "This email address is already taken. Please provide a new email address."
            });
        }
       user = await User.create(req.body);
        
       const token = newToken(user);

       res.status(201).json({ user, token });
    }
    catch(e){
        res.status(500).send({ status: "Failed", message: e.message});
    }
}

const login = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user)
        return res.status(400).json({
            status: "Failed",
            message: "Please provide correct email address and password",
        });

        const match = await user.checkPassword(req.body.password)

        if(!match)
        return res.status(400).json({
            status: "Failed",
            message: "Please provide correct email address and password",
        });

        const token = newToken(user);

        res.status(201).json({ user, token });
    }
    catch(e){
        res.status(500).send({ status: "Failed", message: e.message});
    }
   
}

module.exports  = { register, login }
