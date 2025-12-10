const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // registers model
const Model = mongoose.model('trips');

/**
 * GET /api/trips
 * Returns a list of all trips.
 */
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();

    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ message: 'No trips found' });
    }

    return res
      .status(200)
      .json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

/**
 * GET /api/trips/:tripCode
 * Returns a single trip identified by code.
 */
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model
      .findOne({ code: req.params.tripCode })
      .exec();

    if (!trip) {
      return res
        .status(404)
        .json({ message: 'Trip not found' });
    }

    return res
      .status(200)
      .json(trip);
  } catch (err) {
    console.error('Error fetching trip by code:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/trips
 * Creates a new trip.
 */
const tripsAddTrip = async (req, res) => {
  try {
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

    const savedTrip = await newTrip.save();

    if (!savedTrip) {
      return res
        .status(400)
        .json({ message: 'Failed to add trip' });
    }

    return res
      .status(201)
      .json(savedTrip);
  } catch (err) {
    console.error('Error adding trip:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

/**
 * PUT /api/trips/:tripCode
 * Updates an existing trip.
 */
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip
      .findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
        { new: true }
      )
      .exec();

    if (!updatedTrip) {
      return res
        .status(404)
        .json({ message: 'Trip not found or update failed' });
    }

    return res
      .status(200)
      .json(updatedTrip);
  } catch (err) {
    console.error('Error updating trip:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

/**
 * DELETE /api/trips/:tripCode
 * Deletes a trip by code.
 */
const tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip
      .findOneAndDelete({ code: req.params.tripCode })
      .exec();

    if (!deletedTrip) {
      return res
        .status(404)
        .json({ message: 'Trip not found or delete failed' });
    }

    return res
      .status(200)
      .json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error deleting trip:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
