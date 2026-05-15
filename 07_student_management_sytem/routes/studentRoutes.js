import express from "express";

import studentControllers from "../controller/studentController.js";

const router = express.Router();

router.post("/add", studentControllers.add);

router.get("/getAllStudents", studentControllers.getAllStudentData);

export default router;
