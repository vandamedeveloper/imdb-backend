const express = require("express");
const {
  signupMiddleware,
  hashPasswordMiddleware,
  validateToken,
} = require("../controllers/user.controller");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/utils");
const router = express.Router();

// create user

router.post("/login/token", (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        // email does not exist on database
        return res.status(401).json({
          error: "Incorrect username or password",
        });
      }
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) {
          return res.status(500).json({
            error: `An error occurred: ${error}`,
          });
        }
        if (!match) {
          // incorrect password
          return res.status(401).json({
            error: "Incorrect username or password",
          });
        }
        // generate token
        const token = createToken(user.username, user._id, user.email);
        return res.status(201).json({ access_token: token });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: `An error occured: ${error}`,
      });
    });
});

router.post(
  "/signup/token",
  signupMiddleware,
  hashPasswordMiddleware,
  (req, res) => {
    //Create a new user
    const user = new User(req.body);
    try {
      user
        .save()
        .then((result) => {
          //genertate token
          const token = createToken(user.username, user._id, user.email);
          return res.status(201).json({ access_token: token });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({
            error: "Error saving user. Please try again later." + err,
          });
        });
    } catch (error) {
      return res.status(500).json({
        error: "Error saving user. Please try again later.",
      });
    }
  }
);

router.get("/userinfo", validateToken, (req, res) => {
  const { username, userId, email } = req.user;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      res.status(200).json({
        username,
        userId,
        email,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({
        error: "Error fetching user information. Please try again later.",
      });
    });
});
module.exports = router;
