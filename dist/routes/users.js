"use strict";

module.exports = function (app) {
  var Users = app.db.models.Users;
  /*app.get('/users/:id', (req, res) => {
    Users.findById(req.params.id, {
      attributes: ['id', 'name', 'email']
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });*/

  app.route('/users/:id').get(function (req, res) {
    Users.findOne({
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
  });
  app["delete"]('/users/:id', function (req, res) {
    Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.post('/users', function (req, res) {
    Users.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
};