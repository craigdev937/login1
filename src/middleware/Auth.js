import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token
        });
        if (!rootUser) {
            throw new Error("User is not found!");
        };
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized - No Token!");
        console.log(error);
    }
};






