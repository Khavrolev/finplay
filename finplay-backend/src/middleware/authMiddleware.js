const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "User is't authorized" });
    }

    const decodedData = jwt.verify(token.split(" ")[1], SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "User is't authorized" });
  }
};
