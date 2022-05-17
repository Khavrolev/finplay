const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { port, pathToData } = require("./config");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const { login, logout } = require("./login");

let data;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const startApp = () => {
  try {
    data = JSON.parse(fs.readFileSync(pathToData));
    app.listen(port, () => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();

app.get("/", authMiddleware, (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/test", roleMiddleware("admin"), (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", login);
app.post("/logout", logout);
