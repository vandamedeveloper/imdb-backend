const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const movieSchema = mongoose.Schema({
  _id: ObjectId,
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
