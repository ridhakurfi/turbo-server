const express = require("express");
const Controller = require("../controllers/controller");
const { errorNet } = require("../middlewares/errorhandler");
const { authentification } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login)
router.get("/items", Controller.findAll)
router.use(authentification)

router.get("/tasks", Controller.findAllByUser)
router.get("/items/:id", Controller.findOne)
router.post("/items", Controller.create)
router.put("/items/:id", Controller.update)
router.delete("/items/:id", Controller.delete)
router.use(errorNet)

module.exports = router;