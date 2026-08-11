import express from "express";
import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import foodController from "../controller/food.controller.js";

const router = express.Router();

router.post("/add", auth, checkRole("admin", "provider"), foodController.add);

export default router;
