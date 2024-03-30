const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../helper/index");
const User = require("../models/userSchema");
const { registerSchema, loginSchema } = require("../validatoin/userValidation");

const userRegister = async (req, res) => {
  try {
    //validate user inputs
    const { success } = registerSchema.safeParse(req.body);
    if (!success) {
      return res.status(406).json({ msg: "Invalid inputs" });
    }

    //check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(409).json({ msg: "User alredy exist" });
    }

    //hash password and create a new user
    const hash = await hashPassword(req.body.password);
    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hash,
    });
    res.status(201).json({ msg: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Problem" });
  }
};

const userLogin = async (req, res) => {
  try {
    //validate user inputs
    const { success } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.status(406).json({ msg: "Invlaid inputs" });
    }

    //check if user exist
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).json({ msg: "Incorrect username" });
    }

    //compare password and hash
    if (!(await verifyPassword(req.body.password, user.password))) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    //generate json web token
    const token = await generateToken(req.body.username);
    res.status(200).json({
      msg: "Login Successfull",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server problem" });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
