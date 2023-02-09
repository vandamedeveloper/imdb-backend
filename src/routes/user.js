const express = require("express");

const router = express.Router();

// create user
router.post("/signup", (req, res) => {
  res.status(200).json({
    id: 1,
    username: "Vandame_98",
    email: "vandiamirovic@gmail.com",
  });
});

router.post("/login", (req, res) => {
  res.status(200).json({
    id: 1,
    username: "Vandame_98",
    email: "vandiamirovic@gmail.com",
  });
});

module.exports = router;
