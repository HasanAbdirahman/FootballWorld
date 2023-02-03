var express = require("express");
var router = express.Router();
var playersCtrl = require("../controller/players");

/* GET users listing. */
router.get("/", isLoggedIn, playersCtrl.index);
router.get("/new", isLoggedIn, playersCtrl.new);
router.post("/", isLoggedIn, playersCtrl.create);
router.get("/:id", playersCtrl.show);
router.delete("/:id", playersCtrl.delete);
router.get("/:id/edit", playersCtrl.edit);
router.put("/:id", isLoggedIn, playersCtrl.update);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
