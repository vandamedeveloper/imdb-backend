const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (username, id, email) => {
    const token = jwt.sign(
      {
        username,
        userId: id,
        email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    return token;
  },
};
