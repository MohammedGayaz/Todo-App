const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { slatRound, jwtPassword } = require("../config");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(slatRound, (err, slat) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, slat, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

const genJwtToken = (username) => {
  return jwt.sign({ username: username }, jwtPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
  genJwtToken,
};
