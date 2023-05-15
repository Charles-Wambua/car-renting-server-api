const express = require("express");
const UserModel = require("../../models/Users");
const bcrypt = require("bcryptjs");


const router = express.Router();

router.use(express.json());

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const User = await UserModel.findOne({ email });
  if (!User) {
    return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, User.password)
    if (!isPasswordValid) {
        return res.status(400).json({Message: "Incorrect password"})
    }
});
module.exports = router;
