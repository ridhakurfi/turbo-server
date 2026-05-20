const { Task } = require("../models");

class Controller {
  static async findAll(req, res, next) {
    try {
      const item = await Task.findAll();
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const produce = await Item.findByPk(req.params.id);
      if (!produce) throw {name:"IdNotFound"} 
      res.status(200).json(produce);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const produce = await Item.create(req.body);
      res.status(201).json({ message: "Added succesfully", data: produce });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) throw {name:"IdNotFound"} 
      await item.update(req.body);
      res.status(200).json({ message: "Updated successfully", data: item });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req,res, next){
    try {
    const item = await Item.findByPk(req.params.id);
    if (!item) throw {name:"IdNotFound"} 
    await item.destroy();
    res.status(200).json({
      message: "Deleted successfully"
    });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;