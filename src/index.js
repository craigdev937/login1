import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { authRt } from "./routes/authRt.js";

(async () => {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useFindAndModify: false,
        useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("MongoDB is now Connected"))
    .catch((error) => console.log(error));

    const app = express();
    app.use(helmet());

    // CORS Setup
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({"status message": "OK"});
        };
        next();
    });

    // Middleware
    app.use(express.json());
    app.use(logger("dev"));
    app.use(cookieParser());

    // Routes and Port.
    app.use("/api", authRt);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();





