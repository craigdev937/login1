import express from "express";
import { Index, RegisterUser, LoginUser, About, 
    GetData, Contact } from "../controllers/authCon.js";
import { Auth } from "../middleware/Auth.js";

export const authRt = express.Router();
    authRt.post("/register", RegisterUser);
    authRt.post("/login", LoginUser);
    authRt.get("/about", Auth, About);
    authRt.get("/getdata", Auth, GetData);
    authRt.post("/contact", Auth, Contact);
    authRt.get("/", Index);





