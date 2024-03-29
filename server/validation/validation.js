const zod = require("zod");

const registerVal = zod.object({
  name: zod.string(),
  username: zod.string().email().toLowerCase(),
  password: zod.string().min(6).toLowerCase(),
});

const loginVal = zod.object({
  username: zod.string().email().toLowerCase(),
  password: zod.string().min(6).toLowerCase(),
});

const updateVal = zod.object({
  name: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTodo = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
});

module.exports = {
  registerVal,
  loginVal,
  updateVal,
  createTodo,
  updateTodo,
};
