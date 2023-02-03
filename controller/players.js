const Player = require("../model/player");

function index(req, res, next) {
  Player.find({}, function (err, players) {
    res.render("players/index", {
      players,
    });
  });
}

function newPlayer(req, res) {
  Player.findById(req.params.id, function (err) {
    res.render("players/new");
  });
}
function create(req, res) {
  console.log(req.body);
  req.body.accolades = req.body.accolades.split(",");
  let newPlayer = new Player(req.body);
  newPlayer.save(function (err) {
    if (err) res.redirect("/players/new");
    return res.redirect("/players");
  });
}
function show(req, res) {
  Player.findById(req.params.id, function (err, player) {
    console.log(player);
    res.render("players/show", { player });
  });
}

// fix this problem today
function deletePlayer(req, res) {
  Player.findById(req.params.id, function (err, deletedPlayer) {
    if (err) return console.log(err);
    deletedPlayer.remove();
    deletedPlayer.save();
    res.redirect("/players");
  });
}

function edit(req, res) {
  Player.findById(req.params.id, function (err, player) {
    console.log("HASAN");
    res.render("players/edit", { player });
  });
}
function update(req, res) {
  Player.findById(req.params.id, function (err, player) {
    player.name = req.body.name;
    player.accolades = req.body.accolades;
    player.content = req.body.content;
    player.save(function (err) {
      if (err) {
        res.redirect(`/players/${player._id}`);
      }
    });

    res.redirect(`/players/${player._id}`);
  });
}

module.exports = {
  new: newPlayer,
  create,
  index,
  show,
  update,
  edit,
  delete: deletePlayer,
};
