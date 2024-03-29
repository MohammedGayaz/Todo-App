const {
  hashPassword,
  genJwtToken,
  comparePassword,
} = require("../helper/auth");
const User = require("../models/user");
const { loginVal, registerVal } = require("../validation/validation");

const userRegister = async (req, res) => {
  const { success } = registerVal.safeParse(req.body);
  try {
    // validate inputs
    if (!success) return res.status(400).json({ msg: "Invlaid inputs" });

    // check if user exist
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) return res.status(404).json({ msg: "User alredy exist" });

    // hash password and create a new user
    const password = await hashPassword(req.body.password);
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: password,
    });

    res.status(200).json({ msg: "account created successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server problem" });
  }
};

const userLogin = async (req, res) => {
  const { success } = loginVal.safeParse(req.body);

  // vlidate inputs
  if (!success) return res.status(400).json({ msg: "Invliad inputs" });

  // check if user exist
  const user = await User.findOne({ username: req.body.username });
  console.log(await comparePassword(req.body.password, user.password));
  if (!(await comparePassword(req.body.password, user.password))) {
    return res.status(404).json({ msg: "Incorrect password" });
  }

  // generate jwt token
  const token = genJwtToken(req.body.username);
  res.status(200).json({
    msg: "Login successfull",
    token: token,
  });
};

module.exports = {
  userRegister,
  userLogin,
};
