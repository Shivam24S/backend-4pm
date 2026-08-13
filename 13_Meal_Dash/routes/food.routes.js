import express from "express";
import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import foodController from "../controller/food.controller.js";
import { foodImages } from "../middleware/uploads.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  checkRole("admin", "provider"),
  foodImages.array("image", 5),
  foodController.add,
);

export default router;
