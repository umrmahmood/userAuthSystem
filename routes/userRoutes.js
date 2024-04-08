import express from "express";

import { deleteUser, getAllUsers, signUpUser, updateUser } from "../controllers/userControllers.js";
import authN from "../middleware/authN.js";
import authZ from "../middleware/authZ.js";

const router = express.Router();

router.route("/user").get(getAllUsers);

router.route("/user/register").post(signUpUser);

router.route("/user/:id").put(updateUser);

router.route("/user/:id").delete(authZ, deleteUser);



export default router;