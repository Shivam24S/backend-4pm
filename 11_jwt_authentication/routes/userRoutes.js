import express from "express";

import userController from "../controller/userController.js";

const router = express.Router();

router.post("/add", userController.add);


router.get("/allUser", userController.getAllUser);


router.post("/login", userController.login);

export default router;
