let express = require("express");
const { createdata, gethero, UpdateVillain, deleteheros } = require("../Controller/Data.controller");
const { auth } = require("../middlewares/auth.middleware");
const { logger } = require("../middlewares/logger.middleware");


let DataRoutes = express.Router();

DataRoutes.post("/add/hero", auth, logger, createdata);
DataRoutes.get("/hero", auth, gethero);
DataRoutes.patch("/update/villain/:hero_id", auth, logger, UpdateVillain);
DataRoutes.delete("/delete/hero/:hero_id", auth, logger, deleteheros);


module.exports = DataRoutes

