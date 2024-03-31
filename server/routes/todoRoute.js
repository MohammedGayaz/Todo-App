const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} = require("../controller/todo");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", createTask);
router.get("/tasks", listTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
