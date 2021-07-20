import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    work: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    date: { type: Date, default: Date.now },
    messages: [{
        type: String, required: true,
        email: String, required: true,
        phone: String, required: true,
        message: String, required: true,
    }],
    tokens: [{
        token: { type: String, required: true }
    }]
});

// Hash the Password
UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    };
    next();
});

// Generate the Token
UserSchema.methods.generateAuthtoken = async function() {
    try {
        let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

// Storing Messages
UserSchema.methods.addmessage = async function(name, email, phone, message) {
    try {
        this.messages = this.messages.concat({
            name, email, phone, message
        });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
};

export const User = mongoose.model("User", UserSchema);





