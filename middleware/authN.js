import jwt from "jsonwebtoken";
import 'dotenv/config';

export default (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        //"Bearer <token>"
        if (!token) {
            const error = new Error("no token provided");
            error.status = 401; 
            throw error;
        }

        //verify token using JWT
        const secretKey = process.env.SECRET_KEY;
        const decodedToken = jwt.verify(token, secretKey);
        req.userId = decodedToken.id; // Attach userId to request object for future use
        // or 
        // req.user = { id, username, role }; // Attach user object to request

        next();
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};
