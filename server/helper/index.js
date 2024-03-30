const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { saltRounds, JWT_SECRETE } = require("../config");

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = async (username) => {
  return jwt.sign({ username: username }, JWT_SECRETE, { expiresIn: "1h" });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
};
