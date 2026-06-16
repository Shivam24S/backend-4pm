import express from "express";

import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);


router.get("/allUser", auth, userController.getAllUser);


router.post("/login", userController.login);

router.post("/authLogin", auth, userController.authLogin)


router.delete("/deleteUser", auth, userController.deleteUser);

router.patch("/update", auth, userController.updateUser)

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll",auth,userController.logOutAll)

export default router;
