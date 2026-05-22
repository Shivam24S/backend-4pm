import express from "express";

import employeeController from "../controller/employeeController.js";

const router = express.Router();

router.post("/add", employeeController.add);

router.get("/all-Employee", employeeController.getAllEmployee);

router.delete("/deleteAll", employeeController.deleteAllEmployee);

router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployeeById);

// router.patch("/:id", employeeController.updateEmployeeData);
router.patch("/:id", employeeController.updateManually);

export default router;
