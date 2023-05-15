const express = require('express');
const CarModel = require('../../models/Cars');

const router = express.Router();

router.get('/getCars', async (req, res) => {
  try {
    const { selectedCarId } = req.query;
    
    if (selectedCarId) {
      const car = await CarModel.findById(selectedCarId);
      res.status(200).json([car]);
    } else {
      const cars = await CarModel.find();
      res.status(200).json(cars);
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;
