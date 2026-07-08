import express from "express";

// controllers
import userController from "../controller/user.controller.js";

// validation
import validate from "../middleware/validate.js";
import registerSchema from "../validation/register.schema.js";

const router = express.Router();


// routes 

router.post("/add", validate(registerSchema), userController.add);

router.post("/login", userController.login);

export default router;
