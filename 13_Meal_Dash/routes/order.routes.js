import express from "express";
import auth from "../middleware/Auth.js";
import orderController from "../controller/order.controller.js";

const router = express.Router();

router.post("/placeOrder", auth, orderController.placeOrder);

export default router;
