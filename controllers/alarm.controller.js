const Alarm = require("../models/alarm.model");
const User = require("../models/user.model");

exports.getAlarm = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const alarme = user.farm[0].alarm;
    res.status(200).send(alarme);
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
};

exports.updateAlarm = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "user not found" });
    }

    const alarmState = req.body.state;

    user.farm[0].alarm = alarmState;

    await user.farm[0].save();

    res.status(200).send({ message: "alarm updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};
