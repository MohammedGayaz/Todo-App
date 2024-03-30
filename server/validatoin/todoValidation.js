const zod = require("zod");

const todoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const todoUpdateSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
  completed: zod.boolean().optional(),
});

module.exports = {
  todoSchema,
  todoUpdateSchema,
};
