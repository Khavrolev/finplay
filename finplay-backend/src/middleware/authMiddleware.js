const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "User is't authorized" });
    }

    const decodedData = jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "User is't authorized" });
  }
};
