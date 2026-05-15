import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.json({ message: "hello from server" });
});

// undefined routes

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

// centralize error

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new HttpError(error.message));
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

async function startServer() {
  try {
     const connect =   await connectDB();


     if(!connect){
      throw new Error("failed to connect db")
     }

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

startServer();
