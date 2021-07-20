import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const RegisterUser = async (req, res, next) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "Please enter your info"});
    };
    try {
        const emailExists = await User.findOne({email: email});
        if (emailExists) {
            res.status(422).json({error: "That Email already exists!"});
        } else if (password != cpassword) {
            res.status(422).json({error: "Passwords don't match!"});
        } else {
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(200).json({msg: "User Registered!"});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const LoginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({error: "Please add info"});
    };
    try {
        const UserLogin = await User.findOne({email: email});
        if (UserLogin) {
            const isMatch = 
                await bcrypt.compare(password, UserLogin.password);
            const token = await UserLogin.generateAuthtoken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            });
            if (!isMatch) {
                res.status(400).json({error: "Invalid Credentials"});
            } else {
                res.status(200).json({message: "Logged in Success!"});
            }
        } else {
            res.status(400).json({error: "Invalid Credentails!"});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const About = (req, res, next) => {
    try {
        res.send(req.rootUser);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const GetData = (req, res, next) => {
    try {
        res.send(req.rootUser);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const Contact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("Empty contact details");
            return res.json({error: "Please fill in the details"});
        };
        const userContact = await User.findOne({_id: req.userID});
        if (userContact) {
            const userMessage = await userContact.addmessage(
                name, email, phone, message
            );
            await userContact.save();
            res.status(201).json({msg: "Contact Saved!"});
        };
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const Index = (req, res) => {
    res.json({ home: "Login API" });
};





