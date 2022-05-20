const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { PORT, PATH_DATA, CLIENT_URL } = require("./config");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const { login, logout, refresh } = require("./login");

let data;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  }),
);

const startApp = () => {
  try {
    const rawData = JSON.parse(fs.readFileSync(PATH_DATA));
    rawData.games = rawData.games.map((game) => {
      const gameGroup = rawData.groups.find((group) =>
        group.games.includes(game.id),
      );
      return {
        ...game,
        group: gameGroup ? gameGroup.id : 0,
      };
    });
    console.log(rawData);
    data = rawData;
    app.listen(PORT, () => {
      console.log(`Connected successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();

app.get("/data", authMiddleware, (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/test", roleMiddleware, (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/refresh", refresh);
app.post("/login", login);
app.post("/logout", logout);
