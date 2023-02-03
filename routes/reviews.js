var express = require("express");
var router = express.Router();

let reviewsCtrl = require("../controller/reviews");

router.post("/reviews/:id/comments", reviewsCtrl.create);
router.delete("/players/:pid/reviews/:rid", reviewsCtrl.delete);
router.get("/players/:pid/reviews/:rid", reviewsCtrl.edit);
router.put("/players/:pid/reviews/:rid", reviewsCtrl.update);

module.exports = router;
