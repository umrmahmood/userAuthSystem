import express from "express";
import bcrypt from "bcrypt";
import User from '../models/Users.js';

const router = express.Router();

//login endpoint

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user){
    return res.status(401).json({ success:false, message:'Invalid email'})
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if (!passwordMatch){
        return res.status(401).json({ success:false, message:'Invalid password'})
    }
    res.status(200).json({success:true, message:'Login successful'});
 } catch(err) {
        next(err);
    }
}

