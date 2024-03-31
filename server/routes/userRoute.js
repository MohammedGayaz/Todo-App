const express = require("express");
const { listUsers, currentUser } = require("../controller/user");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/users", listUsers);
router.get("/current", currentUser);

module.exports = router;
