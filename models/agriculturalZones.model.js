const mongoose = require("mongoose");
// const valvesSchema = require("./valves.model");
const Sensor = require("./valves.model");
const Valve = require("./sensors.model");

const zoneSchema = new mongoose.Schema({
  localisation_zone: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  sensors: [Sensor.schema],
  valves: [Valve.schema],
  /*   sensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
    },
  ],
  valves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Valve",
    },
  ], */
});

module.exports = mongoose.model("Zone", zoneSchema);
