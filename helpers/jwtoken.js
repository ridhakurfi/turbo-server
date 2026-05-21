const jwt = require("jsonwebtoken");

const createToken = (content) => {
  return jwt.sign(content, process.env.SECRET);
};

const clarifyToken = (unbox) => {
  try {
    return jwt.verify(unbox, process.env.SECRET);
  } catch (error) {
    throw { name: "Unauthorized" }
  }
};

module.exports = { createToken, clarifyToken };