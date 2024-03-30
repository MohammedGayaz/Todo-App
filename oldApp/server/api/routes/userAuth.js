const express = require("express");
const router = express.Router();

const { userRegister, userLogin } = require("../../controllers/authController");

router.get("/test", (req, res) => {
  res.send("user router working fine");
});

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
