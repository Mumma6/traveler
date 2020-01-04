const express = require("express");
const { getLocations, addLocations } = require("../controlers/location");

const router = express.Router();

// routes
router
  .route("/")
  .get(getLocations)
  .post(addLocations);

module.exports = router;
