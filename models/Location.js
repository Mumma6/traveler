const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const LocationSchema = new mongoose.Schema({
  locationId: {
    type: String,
    required: [true, "Please add a location ID"],
    unique: true,
    trim: true,
    maxlength: [50, "Location ID must be less then 50 chars"]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String, // här kan man lägga till massa saker tydligen
    city: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode and create location
LocationSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress, // här kan vi lägga till city osv
    city: loc[0].city
  }

  // Do not save address
  this.address = undefined;
  next();
})

module.exports = mongoose.model("Location", LocationSchema);
