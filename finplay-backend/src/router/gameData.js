const { Router } = require("express");
const {
  createGroup,
  deleteGroup,
  getAllData,
  updateGroup,
} = require("../data");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const dataRouter = new Router();

dataRouter.get("/", authMiddleware, getAllData);
dataRouter.post("/creategroup", roleMiddleware, createGroup);
dataRouter.put("/updategroup", roleMiddleware, updateGroup);
dataRouter.delete("/deletegroup", roleMiddleware, deleteGroup);

module.exports = dataRouter;
