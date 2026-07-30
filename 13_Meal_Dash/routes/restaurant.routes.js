import express from "express";

import restaurantController from "../controller/restaurant.controller.js";

import auth from "../middleware/Auth.js";
import upload from "../middleware/uploads.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.post(
    "/add",
    auth,
    checkRole("provider", "admin"),
    upload.single("restaurantImage"),
    restaurantController.add,
);

router.get("/allRestaurant",restaurantController.getAllRestaurant)

export default router;
