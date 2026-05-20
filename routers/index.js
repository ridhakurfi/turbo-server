const express = require("express");
const Controller = require("../controllers/controller");
const { errorNet } = require("../middlewares/errorhandler");
const router = express.Router();

router.get("/items", Controller.findAll)
router.get("/items/:id", Controller.findOne)
router.post("/items", Controller.create)
router.put("/items/:id", Controller.update)
router.delete("/items/:id", Controller.delete)
router.use(errorNet)

module.exports = router;