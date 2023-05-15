const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  cartype: String,
  carname: String,
  price: Number,
  images: [String],
  pickup: String,
  dropof: String
});
const CarModel = mongoose.model("cars", CarSchema);
module.exports = CarModel;
