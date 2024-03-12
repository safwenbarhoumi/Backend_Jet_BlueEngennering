const mongoose = require("mongoose");
const Sensor = require("./sensors.model");
const Valve = require("./valves.model");

const zoneSchema = new mongoose.Schema({
  localisation_zone: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  sensors: [Sensor.schema],
  valves: [Valve.schema],
});

module.exports = mongoose.model("Zone", zoneSchema);
