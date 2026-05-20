const errorNet = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "IdNotFound":
      res.status(404).json({ message: "Item not found" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Error in Handler" });
      break;
  }
};

module.exports = {errorNet}