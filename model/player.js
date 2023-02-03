const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: Number,
    detail: String,
    name: String,
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
  },
  {
    timestamps: true,
  }
);

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: Number,
    image: String,
    position: String,
    currentTeam: String,
    accolades: [String],
    content: String,
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
