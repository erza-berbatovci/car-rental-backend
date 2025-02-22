const { ObjectId } = require("mongodb");

class Car {
    constructor(name, price_per_day, year, color, steering_type, number_of_seats) {
        this._id = new ObjectId();
        this.name = name;
        this.price_per_day = price_per_day;
        this.year = year;
        this.color = color;
        this.steering_type = steering_type;
        this.number_of_seats = number_of_seats;
    }
}

module.exports = Car;
