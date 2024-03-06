const db = require("../models");
const User = db.user;
const Farm = db.farm;
const Steg = db.Steg;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { zones, wells, pumps, culture, localisation_farm, alarme, steg } =
      req.body;

    const newFarm = new Farm({
      localisation_farm: localisation_farm,
      culture: culture,
      alarme: alarme,
      wells: wells,
      pumps: pumps,
      zones: zones.map((zone) => ({
        localisation_zone: zone.localisation_zone,
        sensors: zone.sensors,
        valves: zone.valves,
      })),
      steg: steg,
    });

    const savedFarm = await newFarm.save();

    const newUser = new User({
      phone: req.body.phone,
      password: req.body.password,
      name: req.body.name,
      Address: req.body.Address,
      farm: savedFarm._id,
    });

    const savedUser = await newUser.save();

    // Load the populated user with the farm data
    const populatedUser = await User.findById(savedUser._id).populate({
      path: "farm",
      options: { strictPopulate: false },
    });

    res.status(201).send({
      message: "User was registered successfully!",
      user: populatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (!user || user.password !== req.body.password) {
      return res.status(404).send({ message: "Invalid credentials." });
    }

    const userObject = user.toObject();
    const accessToken = generateAccessToken(userObject);
    const refreshToken = jwt.sign(userObject, process.env.REFRESH_TOKEN_SECRET);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

function generateAccessToken(user) {
  const payload = {
    userId: user._id,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d", // Adjust the expiration as needed
  });
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.error(err);
  }
};
