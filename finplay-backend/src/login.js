const jwt = require("jsonwebtoken");
const { SECRET, COOKIE_NAME } = require("./config");

const users = [
  {
    userName: "user",
    password: "user",
    adminRole: false,
  },
  { userName: "admin", password: "admin", adminRole: true },
];

const generateAccessToken = (userName, adminRole) => {
  const payload = {
    userName,
    adminRole,
  };

  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, SECRET);

    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.login = (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = users.find((item) => item.userName === userName);

    if (!user) {
      return res.status(400).json({ message: `User ${userName} not found` });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: `Wrong password for user ${userName}` });
    }

    const { adminRole } = user;
    const token = generateAccessToken(userName, adminRole);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 24 * 60 * 60 * 1000,
      httponly: true,
    });
    return res.status(200).json({ token, user: { userName, adminRole } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Login error" });
  }
};

exports.refresh = (req, res) => {
  try {
    const oldToken = req.cookies[COOKIE_NAME];

    if (!oldToken) {
      return res.status(403).json({ message: "User is't authorized" });
    }

    const userData = validateAccessToken(oldToken);
    if (!userData) {
      return res.status(403).json({ message: "User is't authorized" });
    }
    const { userName, adminRole } = userData;

    const user = users.find((item) => item.userName === userName);
    if (!user) {
      return res.status(400).json({ message: `User ${userName} not found` });
    }
    const token = generateAccessToken(userName, adminRole);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 24 * 60 * 60 * 1000,
      httponly: true,
    });
    return res.status(200).json({ token, user: { userName, adminRole } });
  } catch (error) {
    console.error(error);
  }
};

exports.logout = (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    res.clearCookie(COOKIE_NAME);
    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
  }
};
