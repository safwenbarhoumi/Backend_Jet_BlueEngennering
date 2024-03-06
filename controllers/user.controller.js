const db = require("../models");
const User = db.user;

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const profile = {
      name: user.name,
      address: user.Address,
      phone: user.phone,
    };

    res.status(200).json({ profile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    if (req.name) {
      user.name = name;
    }
    if (req.address) {
      user.Address = address;
    }
    if (req.phone) {
      user.phone = phone;
    }

    await user.save();

    const updatedProfile = {
      name: user.name,
      address: user.Address,
      phone: user.phone,
    };

    res.status(200).json({ profile: updatedProfile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};
