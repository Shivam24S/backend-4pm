import express from "express";

// controllers
import userController from "../controller/user.controller.js";

// validation
import validate from "../middleware/validate.js";
import { registerSchema, updateUserSchema } from "../validation/user.schema.js";

// middleware
import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import {profilePic} from "../middleware/uploads.js";
import { authLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// routes

router.post(
  "/add",
  profilePic.single("profilePic"),
  validate(registerSchema),
  userController.add,
);

router.post("/login",authLimiter, userController.login);

router.post("/authLogin", auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

router.delete("/delete", auth, userController.deleteUser);

router.patch(
  "/update",
  auth,
  // upload.single("profilePic"),
  validate(updateUserSchema),
  userController.updateUser,
);

router.get("/allUsers", auth, checkRole("admin"), userController.getAllUser);

export default router;
