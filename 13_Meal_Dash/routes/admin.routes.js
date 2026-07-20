import express from "express";

import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import userController from "../controller/user.controller.js";

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
    upload.single("profilePic"),
    checkRole("admin"),
    validate(updateUserSchema),
    userController.updateUser,
);

export default router;
