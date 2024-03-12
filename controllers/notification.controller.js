const Notification = require("../models/notification.model");

exports.getnottifications = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("Farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const Alarme = user.farm[0].alarm;
    console.log(Alarme);
    res.status(200).send(pumpes);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};
