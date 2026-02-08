// Bring in the DB connection and the Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

// Read seed data from trips.json
const tripsDataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsDataPath, 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
}).catch(async (err) => {
    console.log('Error seeding database: ', err);
    await mongoose.connection.close();
    process.exit(1);
});
