const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { setData } = require("./db/db");
const dataRouter = require("./router/gameData");
const userRouter = require("./router/user");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use("/data", dataRouter);
app.use("/user", userRouter);

const startApp = () => {
  try {
    setData(JSON.parse(fs.readFileSync(process.env.PATH_DATA)));
    app.listen(process.env.PORT, () => {
      console.log(`Connected successfully on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
