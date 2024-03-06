const controller = require("../controllers/wells.controller");
const { authJWT } = require("../middlewares");
const wellRouter = require ("express").Router()


wellRouter.get("/pumps", controller.getAllWells)
wellRouter.post("/updatePump", controller.updateWell)
wellRouter.post("/resetPump", controller.resetAllWells)

module.exports = wellRouter;
