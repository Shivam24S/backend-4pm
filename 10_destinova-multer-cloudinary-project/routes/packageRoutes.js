import express from "express";

import upload from "../middlewares/upload.js";
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/add", upload.single("image"), packageController.add);

export default router;
