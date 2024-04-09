import express from "express";
import bcrypt from "bcrypt";
import Users from '../models/Users.js';

const router = express.Router();

//login endpoint
export const loginUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        // Check if a user with the provided email exists in the database
        const userByEmail = await Users.findOne({ email });
        if (!userByEmail) {
            // If no user found with the provided email, check with username
            const userByUsername = await Users.findOne({ username });
            if (!userByUsername) {
                // If no user found with the provided username or email, return error
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // If a user is found with the provided username, proceed with authentication
            const passwordMatch = await bcrypt.compare(
                password,
                userByUsername.password
            );
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid password" });
            }
            res.status(200).json({ success: true, message: "Login successful" });
        } else {
            // If a user is found with the provided email, proceed with authentication
            const passwordMatch = await bcrypt.compare(
                password,
                userByEmail.password
            );
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid password" });
            }
            res.status(200).json({ success: true, message: "Login successful" });
        }
        // Generate and send token upon successful authentication...
    } catch (error) {
        next(error);
    }
};
