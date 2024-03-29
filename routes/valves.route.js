const controller = require("../controllers/valves.controller");
const valveRoute = require ("express").Router();


valveRoute.get("/valves", controller.getAllValves)
valveRoute.put("/valve/update",controller.updateValve)
valveRoute.post("/valve/reset", controller.resetValve)
valveRoute.post('/valve/schedule', controller.createValveSchedule);
valveRoute.post('/valve/schedule/get', controller.getValveSchedules);
valveRoute.put('/valve/schedule/update', controller.updateValveSchedule);


module.exports = valveRoute
