const { clarifyToken } = require("../helpers/jwtoken");
const { User } = require("../models");
const authentification = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };
    const [type, token] = authorization.split(" ");
    if (token === "null") throw { name: "Unauthorized" };
    if (type !== "Bearer") throw { name: "Unauthorized" };
    const content = clarifyToken(token);
    const staff = await User.findByPk(content.stId);
    if (!staff) throw { name: "Unauthorized" };
    req.us = staff.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentification };