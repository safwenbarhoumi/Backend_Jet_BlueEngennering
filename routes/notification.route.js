const controller = require("../controllers/notification.controller");
const { authJWT } = require("../middlewares");
const notificationRoute = require("express").Router();

notificationRoute.get("/notification", controller.getnottifications);
// notificationRoute.post("/addNotification",controller.addNotification)

module.exports = notificationRoute;
