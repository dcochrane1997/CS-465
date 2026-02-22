const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then(trips => {
            if (!trips) {
                return res.status(404).json({ "message": "trips not found" });
            }
            res.status(200).json(trips);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode })
        .exec()
        .then(trip => {
            if (!trip) {
                return res.status(404).json({ "message": "trip not found" });
            }
            res.status(200).json(trip);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        return res
            .status(400)
            .json({ "message": "Trip not saved" });
    } else {
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Trip
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        return res
            .status(400)
            .json({ "message": "Trip not updated" });
    } else {
        return res
            .status(201)
            .json(q);
    }
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteTrip = async (req, res) => {
    const q = await Trip
        .findOneAndDelete({ 'code': req.params.tripCode })
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ "message": "Trip not found" });
    } else {
        return res
            .status(204)
            .json(null);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
