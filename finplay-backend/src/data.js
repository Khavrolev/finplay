const { getData } = require("./db/db");

exports.getAllData = (req, res) => {
  try {
    res.status(200).json(getData());
  } catch (error) {
    console.error(error);
  }
};

exports.createGroup = (req, res) => {
  try {
    const { name, games } = req.body;
    const data = getData();

    const id =
      Math.max.apply(
        null,
        data.groups.map((item) => item.id),
      ) + 1;

    data.groups[data.groups.length] = { id, name, games };

    res.status(200).json(data.groups[data.groups.length - 1]);
  } catch (error) {
    console.error(error);
  }
};
