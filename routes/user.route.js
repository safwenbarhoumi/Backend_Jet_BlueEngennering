const controller = require("../controllers/user.controller");
const { authJWT } = require("../middlewares");
const userRoute = require('express').Router();


userRoute.get("api/getProfile",controller.getProfile)
userRoute.put("/api/updateProfile",controller.updateProfile)

module.exports=userRoute;
