const express = require("express");
const router = express.Router();

const authRouter = require("./routes/userAuth");
const taskRouter = require("./routes/tasksRoute");

router.get("/test", (req, res) => {
  res.send(" api router working fine");
});

router.use("/auth", authRouter);
router.use("/todos", taskRouter);

module.exports = router;
