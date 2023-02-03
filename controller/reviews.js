let Player = require("../model/player");

function create(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (req.body.image === "") {
      delete req.body.image;
    }
    player.reviews.push(req.body);
    player.save();
    res.redirect(`/players/${player.id}`);
  });
}

function deleteReview(req, res) {
  Player.findById(req.params.pid, function (err, player) {
    player.reviews.id(req.params.rid).remove();
    player.save();
    res.redirect(`/players/${player.id}`);
  });
}
function edit(req, res) {
  Player.findById(req.params.pid, function (err, player) {
    let review = player.reviews.id(req.params.rid);
    res.render("reviews/edit", { player, review });
  });
}
function update(req, res) {
  Player.findById(req.params.pid, function (err, player) {
    if (err) {
      console.log(err);
    }
    player.reviews.id(req.params.rid).rating = req.body.rating;
    player.reviews.id(req.params.rid).detail = req.body.detail;

    player.save();
    res.redirect("/players/" + req.params.pid);
  });
}
module.exports = {
  create,
  update,
  edit,
  delete: deleteReview,
};
