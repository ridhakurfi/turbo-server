const bcrypt = require("bcrypt");

const passHide = (originalPass) => {
  return bcrypt.hashSync(originalPass, bcrypt.genSaltSync(8));
};
const passCheck = (originalPass, hiddenPass) => {
  return bcrypt.compareSync(originalPass, hiddenPass);
};

module.exports = { passHide, passCheck };