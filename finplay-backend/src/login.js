const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const users = [
  {
    userName: "user",
    password: "user",
    role: "user",
  },
  { userName: "admin", password: "admin", role: "admin" },
];

const generateAccessToken = (userName, role) => {
  const payload = {
    userName,
    role,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
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

    const token = generateAccessToken(user.userName, user.role);

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httponly: true });
    return res.status(200).json({ userName: user.userName, role: user.role });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Login error" });
  }
};

exports.logout = (req, res) => {
  try {
    const { token } = req.cookies;
    res.clearCookie("token");
    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
  }
};
