import express from "express";
const router = express.Router();
import User from "../models/user.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
import JWT from "jsonwebtoken";

import bcrypt from "bcrypt"


const JWT_SECRET = "this is mr.stark";
router.post("/signup", [
    body("name", "name must be 3 character").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be 5 character").isLength({ min: 5 })

  ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    const saltRounds = 10;
    let success = false;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
         return res.status(400).json({ error: "this email is already there" });
    }
    else {
        const user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = JWT.sign(data, JWT_SECRET);
        success = true;
         return res.json({success, authToken });
    };
}
)
router.post("/login", [

    body("email", "enter a valid email").isEmail(),
    body("password", "password must be 3 character").isLength({ min: 5 })

  ], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
     }
     let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json("user does't exist");

    }
    else {
        const comparedPassword = bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            res.status(400).json("invalid password");
        }
        else {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = JWT.sign(data, JWT_SECRET);
            success = true;
            res.json({success,authToken});
        }
    };
})
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        let UserId = req.user.id;
        const user = await User.findById(UserId).select("-password");
        res.send(user);
    }
    catch {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
    }

})


export default router;
