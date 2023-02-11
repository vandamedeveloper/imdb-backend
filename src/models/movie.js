const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const movieSchema = mongoose.Schema({
  movieApi_ID: {
    type: String,
    required: true,
    unique: true,
  },
  userLikes: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Movie", movieSchema);
