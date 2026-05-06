import express from "express";
import HttpError from "./middleware/httpError.js";

const taskList = [
  { id: 1, task: "learn", description: "you have to learn new things daily" },
  { id: 2, task: "practice", description: "you have to practice daily" },
];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

// read
app.get("/taskList", (req, res, next) => {
  if (taskList.length === 0) {
    return res
      .status(200)
      .json({ success: true, message: "no task data available" });
  }

  res.status(200).json({
    success: true,
    message: "task Data fetched successfully",
    taskList,
  });
});

app.get("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ success: true, message: "no taskData found with this id" });
  }

  res.status(200).json({ success: true, message: "task found", task });
});

// create

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new HttpError("task or description data are required", 400));
  }

  const newTask = {
    id: new Date().getTime(),
    task,
    description,
  };

  taskList.push(newTask);

  res
    .status(201)
    .json({ success: true, message: "new Task added successfully", newTask });
});

// update using patch partially update only user defined field from body  will be update or rest will remain as it is

app.patch("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskData = taskList.find((t) => t.id === id);

  if (!taskData) {
    return next(new HttpError("task not found with this id for update", 404));
  }

  const { task, description } = req.body;

  if (task) {
    taskData.task = task;
  }

  if (description) {
    taskData.description = description;
  }

  if (!task || !description) {
    return next(new HttpError("task or description data is required", 400));
  }

  res.status(200).json({
    success: true,
    message: "task data updated successfully",
    taskData,
  });
});

// PUT Method

app.put("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskDataIndex = taskList.findIndex((t) => t.id === id);

  if (taskDataIndex === -1) {
    return next(new HttpError("task data with this id not found", 404));
  }

  const { task, description } = req.body;

  // if (!task || !description) {
  //   return next(new HttpError("task or description data is required", 400));
  // }

  // copying old data
  taskList[taskDataIndex] = { ...taskList[taskDataIndex], task, description };

  // without copying old data

  // taskList[taskDataIndex] = {  task, description };

  res.status(200).json({
    success: true,
    message: "task data update successfully",
    updateTask: taskList[taskDataIndex],
  });
});


app.delete("/task/:id",(req,res,next)=>{

  const id = Number(req.params.id);

  const index = taskList.findIndex((t)=>t.id === id);
  
  if(index === -1){
    return next(new HttpError("task not found with this id",404))
  }

  taskList.splice(index,1);

  res.status(200).json({success:true,message:"task data deleted successfully"})

})

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "something went wrong please try again later",
  });
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server running on port ${port}`);
});
