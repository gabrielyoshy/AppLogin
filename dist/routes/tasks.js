"use strict";

module.exports = function (app) {
  var Tasks = app.db.models.Tasks;
  app.route('/tasks').get(function (req, res) {
    Tasks.findAll({}).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Tasks.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.route('/tasks/:id').get(function (req, res) {
    Tasks.findOne({
      where: req.params
    }).then(function (result) {
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Tasks.update(req.body, {
      where: req.params
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  })["delete"](function (req, res) {
    Tasks.destroy({
      where: req.params
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(204).json({
        msg: error.message
      });
    });
  });
};