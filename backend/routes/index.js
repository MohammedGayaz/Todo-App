const express = require("express")
const router = express.Router()
const taskRouter = require("./tasks")

router.use("/todos", taskRouter)

module.exports = router; 