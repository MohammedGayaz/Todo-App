const Todo = require("../models/todoSchema");
const User = require("../models/userSchema");
const {
  todoSchema,
  todoUpdateSchema,
} = require("../validatoin/todoValidation");

const createTask = async (req, res) => {
  try {
    //validate todo inputs
    const { success } = todoSchema.safeParse(req.body);
    if (!success) {
      return res.status(406).json({ msg: "Invalid inputs" });
    }

    //create a new todo
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });

    // update user todos array
    const username = req.user.username;
    await User.findOneAndUpdate(
      { username: username },
      { $push: { todos: todo._id } },
      { new: true }
    );

    res.status(200).json({ msg: "Task created Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server problem" });
  }
};

const listTasks = async (req, res) => {
  try {
    const todoIds = req.user.todos;
    const todos = await Todo.find({ _id: { $in: todoIds } });
    res.status(200).json({ todos: todos });
  } catch (error) {
    res.status(500).json({ error: "Internal server problem" });
  }
};

const updateTask = async (req, res) => {
  try {
    // check if task exists
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //validate user details
    const { success } = todoUpdateSchema.safeParse(req.body);
    if (!success) {
      return res.status(406).json({ msg: "Invalid inputs" });
    }
    //update task
    await Todo.updateOne(req.body);
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server problem" });
  }
};

const deleteTask = async (req, res) => {
  try {
    // check if task exists
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //delete task and remove if form user todo array
    const user = req.user;
    const taskIndex = req.user.todos.indexOf(taskId);

    await user.todos.splice(taskIndex, 1);
    user.save();

    await task.deleteOne({ _id: taskId });

    res.status(200).json({ msg: "Task deleted successuflly" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server problem" });
  }
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
};
