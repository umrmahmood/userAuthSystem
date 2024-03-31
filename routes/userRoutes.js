import express from "express";

import authN from "../middleware/authN.js";
import { signUpUser } from "../controllers/userControllers.js";
import { updateUser } from "../controllers/userControllers.js";
import authN from "../middleware/authN.js";

const router = express.Router();

router.route("/user/register").post(signUpUser);

router.route("/user/:id").put(authN, updateUser);


export default router;