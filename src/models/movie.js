const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const movieSchema = mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Movie", movieSchema);
