import express from "express";

import {
	deleteUser,
	getAllUsers,
	signUpUser,
	updateUser,
	// loginUser,
	getUserById,
} from "../controllers/userControllers.js";
import authN from "../middleware/authN.js";
import authZ from "../middleware/authZ.js";

const router = express.Router();

router.route("/user").get(getAllUsers);

router.route("/user/register").post(signUpUser);

// router.route("/user/login").post(loginUser);

router
//http://localhost:5000/user/6613b29a09309e17a1a900bc
	.route("/user/:id")
	.put(updateUser)
	.delete(authZ, deleteUser)
	.get(getUserById);


export default router;