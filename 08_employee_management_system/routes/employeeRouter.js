import express from "express";

import employeeController from "../controller/employeeController.js";

const router = express.Router();

router.post("/add", employeeController.add);

export default router;
