// import Users from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()



//signup user
export const signUpUser = async (req, res, next) => {
	try {
		let {
			firstName,
			lastName,
			phoneNumber,
			email,
			address,
			password,
			isAdmin,
		} = req.body;

		// check for the existing user
		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			const error = new Error("User already exists");
			error.status = 400;
			throw error;
		}
     
		//if not then create a new user
		let newUser = new Users({
			firstName, 
			lastName,
			phoneNumber,
			email,
			address,
			password,
			isAdmin,
		});

		//before saving, hash the password
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);

		//save user
		await newUser.save();


		//before sending the response we generate a JWT token to be sent to user
        //upon successful user creation, it will allow the client to authenticate subsequent requests.
		const payload = {
			id: newUser._id,
			isAdmin,
			name: `${newUser.firstName} ${newUser.lastName}`,
		};
		const secretKey = process.env.SECRET_KEY;


        //This function generates a JWT(json web token) 
        //its last argument is a callback, which is invoked once the token is generated. 
		jwt.sign(payload, secretKey, { expiresIn: "1hr" }, (err, token) => {
			if (err) {
				next(err);
			}
			res.status(201).send({
				success: true,
				message: "user saved in DB",
				token,
			});
		});
	} catch (err) {
		next(err);
	}
};

