
import express from "express";
import { loginUser } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { updateUser } from "../controllers/userControllers.js";
import isAdmin from "../middleware/isAdmin.js"; // Import isAdmin middleware

const router = express.Router();

// Route for user login
router.post("/login", loginUser);

// Protected route - Only authenticated users can access
router.put("/user/:id", authMiddleware, updateUser);

// Protected route - Only admins can access
router.put("/admin/update/:id", authMiddleware, isAdmin, updateUser);

export default router;
