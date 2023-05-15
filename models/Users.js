const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
