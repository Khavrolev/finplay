const { Router } = require("express");
const { refresh, login, logout } = require("../login");

const userRouter = new Router();

userRouter.get("/refresh", refresh);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
