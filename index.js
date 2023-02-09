// app.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const connectToDatabase = require("./db");
const userRoutes = require("./src/routes/user");

// CONFIGURATION
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToDatabase();

app.get("/", (req, res) => {
  res.send("API");
});

// MIDDLEWARES
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
