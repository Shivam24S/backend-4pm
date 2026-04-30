import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let studentList = [
  {
    id: 1,
    name: "alice",
  },
  {
    id: 2,
    name: "charlie",
  },
];

app.get("/", (req, res) => {
  res.render("index", { studentList });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name } = req.body;

  const newStudent = {
    id: new Date().getTime(),
    name,
  };

  studentList.push(newStudent);

  res.redirect("/");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`server running on port ${port}`);
});
