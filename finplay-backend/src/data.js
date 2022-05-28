const { getData, setData } = require("./db/db");

const checkName = (items, name) => {
  return items.map((item) => item.name).includes(name);
};

const checkId = (items, id) => {
  return items.map((item) => item.id).includes(id);
};

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

    if (checkName(data.groups, name)) {
      return res.status(400).json({ message: "Wrong name" });
    }

    const id =
      data.groups.length > 0
        ? Math.max.apply(
            null,
            data.groups.map((item) => item.id),
          ) + 1
        : 1;

    const group = { id, name, games };
    setData({ ...data, groups: [...data.groups, group] });

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
  }
};

exports.updateGroup = (req, res) => {
  try {
    const group = req.body;
    const data = getData();

    if (!checkId(data.groups, group.id)) {
      return res.status(400).json({ message: "Wrong id" });
    }

    const groups = data.groups.map((item) =>
      item.id === group.id ? group : item,
    );

    setData({ ...data, groups });
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteGroup = (req, res) => {
  try {
    const { id } = req.query;
    const { movingGroupId } = req.body;
    const data = getData();

    if (!checkId(data.groups, +id)) {
      return res.status(400).json({ message: "Wrong id" });
    }

    if (!(checkId(data.groups, movingGroupId) || movingGroupId === -1)) {
      return res.status(400).json({ message: "Wrong id" });
    }

    const groupDeleted = data.groups.find((item) => item.id === +id);
    let groupUpdated;

    if (movingGroupId !== -1) {
      groupUpdated = data.groups.find((item) => item.id === movingGroupId);
      groupUpdated.games = [
        ...new Set([...groupUpdated.games, ...groupDeleted.games]),
      ];
    }

    const groups = data.groups
      .filter((item) => item.id !== +id)
      .map((item) => (item.id === movingGroupId ? groupUpdated : item));

    setData({ ...data, groups });

    const response =
      movingGroupId !== -1
        ? {
            groupDeleted,
            groupUpdated,
          }
        : { groupDeleted };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};
