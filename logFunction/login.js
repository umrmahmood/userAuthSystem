import express from "express";
import bcrypt from "bcrypt";
import User from './models/user.js';

const router = express.Router();

//login endpoint

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user   || !(await bcrypt.compare( password, user.password))) {
return res.status(401).json({ success:false, message:'Invalid username'})
    }

    res.status(200).json({success:true, message:'Login successful'});
 } catch(err) {
        next(err);
    }
})

export default router;