import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 

dotenv.config();

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });

        // If user doesn't exist, return an error
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.status = 401;
            throw error;
        }

        // Generate JWT token
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1hr" });

        // Send token as response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
};
