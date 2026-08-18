import express from "express";

import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import userController from "../controller/user.controller.js";
// import upload from "../middleware/uploads.js"
import validate from "../middleware/validate.js";
import { updateUserSchema } from "../validation/user.schema.js";
import adminController from "../controller/admin.controller.js";

const router = express.Router();

// user delete

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  userController.deleteUser,
);

router.patch(
  "/update/:id",
  auth,
  // upload.single("profilePic"),
  checkRole("admin"),
//   validate(updateUserSchema),
  userController.updateUser,
);

// all users

router.get("/allUsers", auth, checkRole("admin"), adminController.getAllUsers);


// dashboard 

router.get("/dashboard",auth,checkRole("admin"),adminController.dashBoardStatics)

export default router;
