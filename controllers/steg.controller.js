//const Steg = require("../models/steg.model");
const PumpSchedule = require("../models/pumpSchedule.model");
const WellSchedule = require("../models/wellSchedule.model");
const User = require("../models/user.model");

const controlledBySteg = async (req, res) => {
  console.log("*****************************************");
  try {
    console.log("****************************************");
    const userId = req.body.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const steg = user.farm[0].steg;

    console.log(steg);
    //console.log(steg[0].active == 0);

    if (!steg) {
      throw new Error("Steg not found");
    }

    if (steg[0].active === 0) {
      isAccident = 1;
      console.log("steg is not active");

      user.farm[0].pump[0].state = 0;
      user.farm[0].pump[0].courant = 0;
      user.farm[0].wells[0].state = "inactive";
      user.farm[0].wells[0].courant = 0;
      user.farm[0].steg[0].isAccident = 1;
      await user.farm[0].save();

      console.log("Accident: All machines deactivated");
    }
    if (steg[0].active == 1 && user.farm[0].steg[0].isAccident == 1) {
      console.log("active and accidented !!!");
      console.log("updating in the database!!!!!!!");
      user.farm[0].steg[0].isAccident = 0;
      await user.farm[0].save();
      /* if (steg[0].automatic_mode == 1) {
        //
        //
        //
        const delay = await calculateDelay(
          user.farm[0].pumpes.pumpschedule,
          steg[0].automatic_mode
        );
        console.log("automatic mode is on");
        //const delay = await calculateDelay(user.farm[0].pumpes.pumpschedule);
        console.log("delay is :");
        console.log(delay);
        setTimeout(() => {
          //pumpe.etat = "active";
          console.log(`Pump activated after delay: ${delay} milliseconds`);
        }, delay);

        farm.wells.forEach(async (wells) => {
          if (wells.etat === "inactive") {
            // Calculate delay based on wellschedule
            const delay = await calculateDelay(wells.wellschedule);
            setTimeout(() => {
              wells.etat = "active";
              console.log(`Well activated after delay: ${delay} milliseconds`);
            }, delay);
          }
        });
      } */
      if (steg[0].automatic_mode == 1) {
        const pumpDelay = await calculateDelay(
          user.farm[0].pumpes.pumpschedule,
          steg[0].automatic_mode
        );
        console.log("automatic mode is on");
        console.log("Pump delay is:", pumpDelay);

        setTimeout(() => {
          // Update pump status to "active" after delay
          user.farm[0].pumpes[0].etat = "active";
          user.farm[0].pumpes[0].save();
          console.log(`Pump activated after delay: ${pumpDelay} milliseconds`);
        }, pumpDelay);

        farm.wells.forEach(async (well) => {
          if (well.etat === "inactive") {
            // Calculate delay based on wellschedule
            const wellDelay = await calculateDelay(well.wellschedule);

            setTimeout(() => {
              // Update well status to "active" after delay
              well.etat = "active";
              well.save();
              console.log(
                `Well activated after delay: ${wellDelay} milliseconds`
              );
            }, wellDelay);
          }
        });
      } else if (steg[0].automatic_mode == 0) {
        console.log(
          "Manual mode: Machines remain inactive until activated manually"
        );
      }
      //await steg.save();
      //console.log("Steg state updated in the database");
      console.log("updating in the database!!!!!!!");
      user.farm[0].steg[0].isAccident = 0;
      await user.farm[0].save();
    } else {
    }
  } catch (error) {
    console.error("Error in controlledBySteg:", error.message);
  }
};

const calculateDelay = async (scheduleId, automaticMode) => {
  try {
    if (automaticMode === 1) {
      // Static delay
      return 5000;
    } else {
      const schedule =
        (await PumpSchedule.findById(scheduleId)) ||
        (await WellSchedule.findById(scheduleId));
      return schedule.delay || 0;
    }
  } catch (error) {
    console.error("Error in calculateDelay:", error.message);
    return 0;
  }
};

/*const calculateDelay = async (scheduleId) => {
  try {
    const schedule =
      (await PumpSchedule.findById(scheduleId)) ||
      (await WellSchedule.findById(scheduleId));
    return schedule.delay || 0;
  } catch (error) {
    console.error("Error in calculateDelay:", error.message);
    return 0;
  }
};*/

module.exports = { controlledBySteg };