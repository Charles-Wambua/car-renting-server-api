const express = require("express");
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const CarModel = require("../../models/Cars.js");

cloudinary.config({
  cloud_name: "charleswambua",
  api_key: "698412892359667",
  api_secret: "rIAE9A4gsBJ8T3N3Y8nlh6o7sAQ",
});

const router = express.Router();

router.use(express.json());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "car-rental-website",
    format: async (req, file) => "png",
    public_id: (req, file) => Date.now().toString(),
  },
});

const upload = multer({ storage });

router.post("/postCar", upload.array("images", 10), async (req, res) => {
  try {
    const newCar = new CarModel({
      carname: req.body.carname,
      cartype: req.body.cartype,
      price: req.body.price,
      pickup: req.body.pickup,
      dropof: req.body.dropof,
      images: req.files.map((file) => file.path),
    });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

module.exports = router;
