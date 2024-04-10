import jwt from 'jsonwebtoken';
import express from "express";
import bcrypt from "bcrypt";
import Users from '../models/Users.js';
import User from '../models/Users.js';


const router = express.Router();

export const loginUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // google function
        if (email && !password && !username) {
            const user = await Users.findOne({ email });
            if (!user) {
                const newUser = new Users({ email });
                await newUser.save();
                const token = generateToken(newUser);
                return res.status(200).json({ success: true, message: "User created", token, user: newUser });

            } else {
                const token = generateToken(user);
                return res.status(200).json({ success: true, message: "User authenticated", token, user });
            }
        }


        // Check if a user with the provided email exists in the database
        const userByEmail = await Users.findOne({ email });
        const user = userByEmail || await Users.findOne({ username }); // Combine the search for email and username
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // If a user is found, proceed with authentication
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        // Generate and send token upon successful authentication
        const payload = {
            id: user._id,
            isAdmin: user.role === "admin",
            name: `${user.profile.firstName} ${user.profile.lastName}`,
        };
        const secretKey = process.env.SECRET_KEY;
        jwt.sign(payload, secretKey, { expiresIn: "1hr" }, (err, token) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send({
                success: true,
                message: "User is logged in",
                token,
                user
            });
        });
    } catch (error) {
        next(error);
    }
};

const generateToken = (user) => {
    const payload = {
        id: user._id,
        isAdmin: user.role === "admin",
        name: `${user.profile.firstName} ${user.profile.lastName}`,
    };
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign(payload, secretKey, { expiresIn: "1hr" });
};