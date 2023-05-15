const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

app.use(cors({
  origin:["https://tripwheelsnation.onrender.com"]
}));
app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://charlie:charlie98@cluster0.sm89d4x.mongodb.net/car-rental-website?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Database connected succesfully");
//   })
//   .catch((error) => {
//     console.log("Database connection failed: " + error);
//   });
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection error: " + error);
  });

// cloudinary.config(
//   {
//     cloud_name: "charleswambua",
//     api_key: "698412892359667",
//     api_secret:"rIAE9A4gsBJ8T3N3Y8nlh6o7sAQ"
//   },
//   (error, result) => {
//     if (error) {
//       console.error("Cloudinary connection error:", error);
//     } else {
//       console.log("Cloudinary connected successfully");
//     }
//   }
// );
// const payload = {
//   _id: user._id,
  
// };
// const token = jwt.sign(payload);
const registerRoute = require("./Routes/auth/register.js");
const loginRoute = require("./Routes/auth/login.js");
const postCarRoute = require("./Routes/cars/cars.js");
const getCarRoute = require("./Routes/cars/getCar.js");

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/postCar", postCarRoute);
app.use("/getCars",getCarRoute)
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port, ${port} `);
});
console.log("cloudinary connected successfully")
