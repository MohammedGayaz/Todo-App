const mongoose = require("mongoose");

// defing task schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  completed: {
    type: Boolean,
  },
});

// creating model form the schema
const Todo = mongoose.model("Task", TodoSchema);

module.exports = {
  Todo,
};
