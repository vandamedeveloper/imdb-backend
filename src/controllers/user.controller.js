const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//create a new user

exports.signupMiddleware = (req, res, next) => {
  // keep a record of the possible errors
  const errors = [];

  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    errors.push("Username, email and password are required fields");
  }

  // Check if email and username already exists in parallel
  Promise.all([User.findOne({ email }), User.findOne({ username })])
    .then(([emailExists, usernameExists]) => {
      if (emailExists) {
        errors.push("This email is already in use!");
      }
      if (usernameExists) {
        errors.push("This username is already in use!");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      errors.push(
        "An error occurred while checking if email and username already exists"
      );
      return res.status(500).json({ errors });
    });
};

exports.hashPasswordMiddleware = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: "Error hashing password. Please try again later.",
      });
    } else {
      req.body.password = hash;
      next();
    }
  });
};

exports.validateToken = (req, res, next) => {
  try {
    // get token from http headers
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          error: "Invalid token",
        });
      }
      // add decded information to the request object
      req.user = decoded;
      // call the next middleware or controller function
      next();
    });
  } catch (error) {
    // If the token is invalid or expired, return a 401 Unauthorized error
    return res.status(401).json({ error });
  }
};
