import express from "express";
import { Index } from "../controllers/authCon.js";

export const authRt = express.Router();
    authRt.get("/", Index);





