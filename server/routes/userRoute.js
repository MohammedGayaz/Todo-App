const express = require("express");
const { listUsers, currentUser } = require("../controller/user");
const { userMiddleware } = require("../middleware/userMiddleware");

const router = express.Router();

router.get("/users", userMiddleware, listUsers);
router.get("/current", userMiddleware, currentUser);

module.exports = router;
