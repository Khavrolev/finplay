const { Router } = require("express");
const { getData } = require("../db/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const dataRouter = new Router();

dataRouter.get("/", authMiddleware, (req, res) => {
  try {
    res.status(200).json(getData());
  } catch (error) {
    console.error(error);
  }
});

dataRouter.get("/test", roleMiddleware, (req, res) => {
  try {
    res.status(200).json(getData());
  } catch (error) {
    console.error(error);
  }
});

module.exports = dataRouter;
