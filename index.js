const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// MIDDLEWARE ROUTES
const userRoutes = require("./src/routes/user");

// CONFIGURATION
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
