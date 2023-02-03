var express = require("express");
const { deserializeUser } = require("passport");
var router = express.Router();
var passport = require("passport");
const user = require("../model/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

// google oauth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res) {
  req.logOut(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
