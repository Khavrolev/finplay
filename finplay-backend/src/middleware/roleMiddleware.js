const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (role) => (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "User is't authorized" });
    }

    const { role: userRole } = jwt.verify(token.split(" ")[1], secret);
    if (role !== userRole) {
      return res.status(403).json({ message: "It's forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "User is't authorized" });
  }
};
