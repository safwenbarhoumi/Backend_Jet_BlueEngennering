const controller = require("../controllers/alarm.controller");
const { authJWT } = require("../middlewares");
const alarmRoute = require ("express").Router()



alarmRoute.get("/getalarme",controller.getAlarm)
alarmRoute.put("/updateAlarm", controller.updateAlarm)
alarmRoute.post("/addalarme", controller.addAlarm)

module.exports = alarmRoute
