const jwt = require("jsonwebtoken");

const { jwtPassword } = require("../config");
const { User } = require("../models/user");

const userMiddleware = async (req, res, next) => {
  // get token and seperat it form bearuer
  const token = req.header("Authorization");

  // verify token
  const decode = jwt.verify(token, jwtPassword);
  if (decode) {
    next();
  } else {
    res.status(400).json({ msg: "unauthorized" });
  }
  res.status(200);
  // check if user exist
};

module.exports = userMiddleware;
