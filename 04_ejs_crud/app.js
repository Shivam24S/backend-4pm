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

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  const student = studentList.find((s) => s.id === Number(id));

  console.log("student data", student);

  if (!student) {
    return res.json({ message: "student not found" });
  }

  res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;

  const student = studentList.find((s) => s.id === Number(id));

  if (!student) {
    return res.json({ message: "student not found" });
  }

  const { name } = req.body;

  student.name = name;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  const student = studentList.find((s) => s.id === Number(id));

  if (!student) {
    return res.json({ message: "student not found" });
  }

  studentList = studentList.filter((s) => s.id !== student.id);

  res.redirect("/");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`server running on port ${port}`);
});
