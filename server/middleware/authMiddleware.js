const jwt = require("jsonwebtoken");
const { JWT_SECRETE } = require("../config");
const User = require("../models/userSchema");

const authMiddleware = async (req, res, next) => {
  try {
    //get token
    const token = req.header("Authorization");
    if (!token) {
      res.status(498).json({ msg: "Invalid Token" });
    }
    //verify token
    const decodedToken = jwt.verify(token, JWT_SECRETE);
    const user = await User.findOne({ username: decodedToken.username });

    if (!user) {
      return res.status(401).json({ msg: "unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: "An error has occured in token" });
  }
};

module.exports = { authMiddleware };
