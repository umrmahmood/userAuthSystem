
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        //"Bearer <token>"
        if (!token) {
            const error = new Error("No token provided");
            error.status = 401;
            throw error;
        }

        // Verify token using JWT
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken; // Attach user object to request

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
