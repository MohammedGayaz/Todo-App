const { Todo } = require("../models/todo");
const { createTodo, updateTodo } = require("../validation/validation");

const createTask = async (req, res) => {
  const { success } = createTodo.safeParse(req.body);
  if (!success) {
    return res.status(403).json({ message: "Invalid inputs" });
  }

  const task = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: false,
  });
  res.status(200).json({ message: "task created Successfully" });
};

const displayTasks = async (req, res) => {
  try {
    const taskList = await Todo.find({});
    res.status(200).json({ list: taskList });
  } catch (err) {
    res.status(500).json({ mag: "Internal server problem" });
  }
};

const updateTask = async (req, res) => {
  const { success } = updateTodo.safeParse(req.body);
  if (!success) {
    return res.status(403).json({ message: "Invalid Inuts" });
  }
  const task = await Todo.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body
  );
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "task updated successfully." });
};

const deleteTask = async (req, res) => {
  const task = await Todo.findOneAndDelete({
    _id: req.params.id,
  });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "task deleted successfully." });
};

module.exports = {
  createTask,
  displayTasks,
  updateTask,
  deleteTask,
};
