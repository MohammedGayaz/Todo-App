const zod = require("zod");

const registerSchema = zod.object({
  name: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const userUpdateSchema = zod.object({
  name: zod.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  userUpdateSchema,
};
