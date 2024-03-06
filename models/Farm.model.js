const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  localisation_farm: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  region: {type: String,},
  culture: { type: String },
  alarm: { type: String },
  wells:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Well",
    },
  ],
  pumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pump",
    },
  ],
  zones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
  ],
  steg: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Steg",
    },
  ],
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
