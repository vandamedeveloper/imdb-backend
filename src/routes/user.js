const express = require("express");

const router = express.Router();

// create user
router.post("/users/signup", (req, res) => {
  res.send("create user");
});

module.exports = router;
