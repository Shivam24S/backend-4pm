// third party or external module
import express from "express";
import dotenv from "dotenv"

// dotenv config
dotenv.config({ path: "./.env" })



// local modules
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

// routes

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());


// routes

app.use("/user", userRoutes)

// server check
app.get("/", (req, res, next) => {
    res.json("hello from server");
});

// if route not found
app.use((req, res, next) => {
    return next(new HttpError("requested route not found"));
});

// centralize error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "internal server error " });
});

async function startServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            throw new Error("Failed to connect db");
        }

        const port = process.env.PORT || 5000;

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message);
            }

            console.log(`server running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}


startServer()