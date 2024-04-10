import express from "express";

import authN from "../middleware/authN.js";
import { signUpUser, updateUser, getUserById, getAllUsers, deleteUser, googleLoginHandler } from "../controllers/userControllers.js";
import { loginUser } from "../logFunction/login.js"
import { logoutUser } from "../logFunction/logout.js";


const router = express.Router();

router.route("/user/register").post(signUpUser);

router.route("/user/:id").put(authN, updateUser);

router.route("/user/login").post(loginUser);

router.route("/user/:id").get(getUserById);

router.route("/user").get(getAllUsers);

router.route("/user/:id").delete(deleteUser)

router.route("/user/logout").post(logoutUser);

router.route("/user/google-login").post(googleLoginHandler);

export default router;