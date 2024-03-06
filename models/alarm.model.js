const mongoose = require("mongoose");
const alarmeSchema = new mongoose.Schema({

  alarmestate: {
    type: String,
  },
  farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
});
module.exports = mongoose.model("Alarm", alarmeSchema);
