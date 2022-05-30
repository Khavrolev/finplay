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
dataRouter.post("/", roleMiddleware, createGroup);
dataRouter.put("/", roleMiddleware, updateGroup);
dataRouter.delete("/", roleMiddleware, deleteGroup);

module.exports = dataRouter;
