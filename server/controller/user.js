const User = require("../models/userSchema");

const listUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ msg: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal server problem" });
  }
};

const currentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server problem" });
  }
};

module.exports = {
  listUsers,
  currentUser,
};
