import express from "express";
import { signUpUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/user/register").post(signUpUser);


export default router;