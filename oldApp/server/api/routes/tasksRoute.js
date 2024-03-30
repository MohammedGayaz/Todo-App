const express = require("express");
const router = express.Router();

const {
  createTask,
  displayTasks,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController");
const userMiddleware = require("../../middleware/userMiddleware");

router.use(userMiddleware);

router.get("/test", (req, res) => {
  res.send("task router working fine");
});

router.post("/create", createTask);
router.get("/tasks", displayTasks);
router.put("update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
