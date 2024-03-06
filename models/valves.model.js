const mongoose = require("mongoose");

const valvesSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  electricityState: {
    type: String,
  },
  hardwareState: {
    type: String,
  },
  batteryLevel: {
    type: Number,
  },
});
module.exports = mongoose.model("Valves", valvesSchema);
