import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/google/login", passport.authenticate("google", {
  scope: [["profile"], ["email"]]
}))

export default router;
