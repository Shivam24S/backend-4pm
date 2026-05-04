import express from "express";
import helmet from "helmet";
import HttpError from "./middleware/HttpError.js";
import checkRole from "./middleware/checkRole.js";

const app = express();

// 1. application level middleware
app.use(express.json());

// 4. external middleware
app.use(helmet());

// this will convert json to Object format for node process beacuse node can't able to process JSON format
// {
//   name: "shivam";
// }

// 2. routes level

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/about", (req, res) => {
  res.send("this is about route");
});

app.get("/admin", checkRole, (req, res, next) => {
  res.send("this is admin routes");
  next();
});

// 3.undefined routes handing

app.use((req, res) => {
  res.send("requested route not found");
});

// 5.centralize error handling

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json(error.message || "internal server error please try again later");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server running on port ${port}`);
});
