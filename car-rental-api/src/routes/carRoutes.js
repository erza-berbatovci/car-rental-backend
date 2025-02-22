const express = require("express");
const { rentalCars } = require("../controllers/carController");
const router = express.Router();

router.get("/rental-cars", rentalCars);

module.exports = router;
