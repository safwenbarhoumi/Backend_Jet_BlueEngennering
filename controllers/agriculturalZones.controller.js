const User = require("../models/user.model");

exports.getZoneDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("Farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const zoneDetaills = user.farm[0].zones;
    res.status(200).send(zoneDetaills);
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
};