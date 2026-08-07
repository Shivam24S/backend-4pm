import express from "express";

import providerController from "../controller/provider.controller.js";
import auth from "../middleware/Auth.js";
import {documents} from "../middleware/uploads.js";

const router = express.Router();

router.post(
  "/register",
  auth,
  documents.array("documents", 3),
  providerController.registerAsProvider,
);

export default router;
