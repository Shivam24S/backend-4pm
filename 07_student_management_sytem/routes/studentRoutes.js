import express from "express";

import studentControllers from "../controller/studentController.js";

const router = express.Router();

router.post("/add", studentControllers.add);

router.get("/getAllStudents", studentControllers.getAllStudentData);

router.get("/:id", studentControllers.getStudentById);

router.delete("/:id", studentControllers.deleteStudent);

router.patch("/:id",studentControllers.updateStudent)

export default router;
