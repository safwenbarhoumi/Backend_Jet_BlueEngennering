const controller = require("../controllers/agriculturalZones.controller");
const { authJWT } = require("../middlewares");
const zoneRoute = require ("express").Router()



zoneRoute.get("/zone",controller.getZoneDetails)


module.exports = zoneRoute
