import express from "express";

import upload from "../middlewares/upload.js";
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/add", upload.single("image"), packageController.add);

router.get("/allPackages", packageController.getAllPackages);

router.get("/:id", packageController.packageById);

router.delete("/:id", packageController.deletePackage);

router.patch(
  "/:id",
  upload.single("image"),
  packageController.updatePackageDetail,
);

export default router;
