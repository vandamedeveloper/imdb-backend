const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = connectToDatabase;
