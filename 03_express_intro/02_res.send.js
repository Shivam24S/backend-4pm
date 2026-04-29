import express from "express";

const app = express();

// routing, middleware

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/about", (req, res) => {
  res.send({ page: "this is about page csadcvdascv" });
});

app.get("/json", (req, res, next) => {
  res.json("this json format for backend api");
});

// middlewares
app.use((req, res, next) => {
  console.log("requested url", req.url);
  next();
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server running on port ${port}`);
});
