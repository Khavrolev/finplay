const { Router } = require("express");
const { createGroup, getAllData } = require("../data");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const dataRouter = new Router();

dataRouter.get("/", authMiddleware, getAllData);
dataRouter.post("/creategroup", roleMiddleware, createGroup);

module.exports = dataRouter;
