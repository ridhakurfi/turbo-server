const { Task, User } = require("../models");
const { passCheck } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwtoken");

class Controller {
  static async findAll(req, res, next) {
    try {
      const item = await Task.findAll();
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
  static async findAllByUser(req, res, next) {
    try {
      const  userId  = req.us;
      const items = await Task.findAll({
        where: {
          userId,
        },
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const item = await Task.findByPk(req.params.id);
      if (!item) throw { name: "IdNotFound" };
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const item = await Task.create(req.body);
      res.status(201).json({ message: "Added succesfully", data: item });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const item = await Task.findByPk(req.params.id);
      if (!item) throw { name: "IdNotFound" };
      await item.update(req.body);
      res.status(200).json({ message: "Updated successfully", data: item });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const item = await Task.findByPk(req.params.id);
      if (!item) throw { name: "IdNotFound" };
      await item.destroy();
      res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const item = await User.create(req.body);
      res.status(201).json({ message: "Register Succesful", data: item });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const emp = await User.findOne({ where: { username } });
      if (!emp || !passCheck(password, emp.password)) {
        throw { name: "WrongPass" };
      }
      const token = createToken({ stId: emp.id });
      res.status(200).json({
        token,
        emp,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
