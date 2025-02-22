const { db } = require("../config/db");

const rentalCars = async (req, res) => {
    const filters = req.query;
    const carsCollection = db.collection("cars");

    const query = {};
    if (filters.year) query.year = parseInt(filters.year);
    if (filters.color) query.color = filters.color;
    if (filters.steering_type) query.steering_type = filters.steering_type;
    if (filters.number_of_seats) query.number_of_seats = parseInt(filters.number_of_seats);

    const cars = await carsCollection.find(query).sort({ price_per_day: 1 }).toArray();
    res.json(cars);
};

module.exports = { rentalCars };
