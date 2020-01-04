const Location = require("../models/Location");

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = async (req, res, next) => {
  try {
    // Get locations from db, find gets all res
    const locations = await Location.find();

    return res.status(201).json({
      success: true,
      count: locations.length, // See how many res we get
      data: locations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Create a location
// @route POST /api/v1/locations
// @access Public
exports.addLocations = async (req, res, next) => {
  try {
    const location = await Location.create(req.body);

    return res.status(201).json({
      success: true,
      data: location
    });
  } catch (error) {
    console.error(error);

    return error.code === 11000
      ? res.status(400).json({ error: "This location already exist" })
      : res.status(500).json({ error: "Server error" });
  }
};
