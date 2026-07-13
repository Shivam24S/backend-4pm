import express from "express";

// controllers
import userController from "../controller/user.controller.js";

// validation
import validate from "../middleware/validate.js";
import registerSchema from "../validation/register.schema.js";

// middleware
import auth from "../middleware/Auth.js";

const router = express.Router();


// routes 

router.post("/add", validate(registerSchema), userController.add);

router.post("/login", userController.login);

router.post("/authLogin", auth, userController.authLogin)

router.post("/logOut", auth, userController.logOut)

router.post("/logOutAll", auth, userController.logOutAll);

router.delete("/delete", auth, userController.deleteUser)



export default router;
