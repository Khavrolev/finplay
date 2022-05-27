const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { PORT, PATH_DATA, CLIENT_URL } = require("./config");
const { setData } = require("./db/db");
const dataRouter = require("./router/gameData");
const userRouter = require("./router/user");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  }),
);
app.use("/data", dataRouter);
app.use("/user", userRouter);

const startApp = () => {
  try {
    setData(JSON.parse(fs.readFileSync(PATH_DATA)));
    app.listen(PORT, () => {
      console.log(`Connected successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
