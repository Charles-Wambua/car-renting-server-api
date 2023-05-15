const express = require("express");
const UserModel = require("../../models/Users");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  const UserExists = await UserModel.findOne({ email });
  if (UserExists) {
    return res
      .status(400)
      .json({ message: "User already exists, Proceed to login" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const User = new UserModel({
    name:name,
    email:email,
    username:username,
    password: hashedPassword,
  });
  try {
    const newUser = await User.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

module.exports = router;
