const Valve = require("../models/valves.model");
const ValveSchedule = require("../models/valveSchedule.model")
const User = require("../models/user.model");

exports.getAllValves = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const allValves = user.farm[0].zones.flatMap(
      (zone) => zone.valves
    );
    res.status(200).send(allValves);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};

exports.updateValve = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "user not found" });
    }
    const {valveId} = req.body;
    let valveToUpdate;
    for (const zone of user.farm[0].zones) {
      valveToUpdate = zone.electrovannes.find((vanne) => vanne._id == valveId);
      if (valveToUpdate) {
        valveToUpdate.Etat = req.body.Etat;
        break;
      }
    }
    if (!valveToUpdate) {
      return res.status(404).send({ message: "Valvee not found" });
    }

    await user.farm[0].save();
    res.status(200).send({ message: "Valve state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.resetValve = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const farm = user.farm[0];
    const zones = farm.zones;

    zones.forEach((zone) => {
      const valves = zone.valves;

      valves.forEach((valve) => {
        valve.state = 0;
      });
    });

    await farm.save();
    return res
      .status(200)
      .send({ message: "valves reset successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.createValveSchedule = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate('farm');
    if (!user || !user.farm) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { valveId, day, timeRanges } = req.body;

    const valve = await Valve.findById(valveId);
    if (!valve) {
      return res.status(404).send({ message: 'Valve not found' });
    }

    const newValveSchedule = new ValveSchedule({ valveId, day, timeRanges });
    const savedValveSchedule = await newValveSchedule.save();

    res.status(201).json(savedValveSchedule);
  } catch (error) {
    console.error('Error creating valve schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getValveSchedules = async (req, res) => {
  try {
    const { valveId } = req.body;

    const valve = await Valve.findById(valveId);
    if (!valve) {
      return res.status(404).json({ error: 'Valve not found' });
    }

    const valveSchedules = await ValveSchedule.find({ valveId }).exec();

    res.status(200).json(valveSchedules);
  } catch (error) {
    console.error('Error getting valve schedules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateValveSchedule = async (req, res) => {
  try {
    const { valveId, scheduleId, day, timeRanges } = req.body;

    // Validate input here if needed

    const valve = await Valve.findById(valveId);
    if (!valve) {
      return res.status(404).json({ error: 'Valve not found' });
    }

    const valveSchedule = await ValveSchedule.findById(scheduleId);
    if (!valveSchedule) {
      return res.status(404).json({ error: 'Valve schedule not found' });
    }

    valveSchedule.day = day;
    valveSchedule.timeRanges = timeRanges;

    const updatedValveSchedule = await valveSchedule.save();

    res.status(200).json(updatedValveSchedule);
  } catch (error) {
    console.error('Error updating valve schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};