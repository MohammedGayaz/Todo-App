const express = require("express");
const authRouter = require("./authRoute");
const todoRouter = require("./todoRoute");
const userRouter = require("./userRoute");

const router = express.Router();

// main routers
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/user/todo", todoRouter);

module.exports = router;
