const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "User is't authorized" });
    }

    const { adminRole } = jwt.verify(token.split(" ")[1], SECRET);
    if (!adminRole) {
      return res.status(403).json({ message: "It's forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "User is't authorized" });
  }
};
