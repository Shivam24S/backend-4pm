

import express from "express"
import checkAuth from "../middleware/CheckAuth.js";


const router = express.Router();


router.get("/", checkAuth, (req, res, next) => {

    res.render("profile", { user: req.user })

})

export default router