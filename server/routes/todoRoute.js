const express = require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} = require("../controller/todo");

const router = express.Router();

router.use(userMiddleware);

router.post("/create", createTask);
router.get("/tasks", listTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
