# Car Rental API

This project is a simple **REST API** for a car rental system built using **Node.js, Express, and MongoDB**. It provides user authentication, profile management, and a rental car listing with filtering options.

## Features
- User Registration & Login
- JWT-based Authentication
- View Profile (Authenticated)
- Retrieve Rental Cars (Sorted & Filtered)
- MongoDB Integration using `mongodb` package

## Prerequisites
Make sure you have the following installed:
- **Node.js** 
- **MongoDB** 
- **Postman** 

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/erza-berbatovci/car-rental-backend.git
   cd car-rental-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/carRental
   JWT_SECRET=your_secret_key
   ```

4. **Start the MongoDB server:**
   ```sh
   mongod --dbpath /your/db/path
   ```
   
5. **Run the server:**
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:5000`

## API Endpoints

### **1. User Registration**
- **Endpoint:** `POST /register`
- **Description:** Registers a new user.


### **2. User Login**
- **Endpoint:** `POST /login`
- **Description:** Authenticates a user and returns a JWT.


### **3. View Profile (Authenticated)**
- **Endpoint:** `GET /my-profile`
- **Description:** Fetches the logged-in user’s details.


### **4. Retrieve Rental Cars**
- **Endpoint:** `GET /rental-cars`
- **Description:** Returns a list of available cars sorted by price.
- **Optional Query Params:**
  - `year`
  - `color`
  - `steering_type`
  - `number_of_seats`
- **Example Request:**
  ```sh
  GET /ental-cars?year=2018&steering_type=manual
  ```

